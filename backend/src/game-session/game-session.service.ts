import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { GameState } from '../game-states.enum';

const stateTransitions: Record<GameState, GameState[]> = {
  [GameState.CREATED]: [GameState.STARTED],
  [GameState.STARTED]: [GameState.AT_CHECKPOINT, GameState.FAILED],
  [GameState.AT_CHECKPOINT]: [GameState.PUZZLE_ACTIVE, GameState.FAILED],
  [GameState.PUZZLE_ACTIVE]: [GameState.PUZZLE_SOLVED, GameState.FAILED],
  [GameState.PUZZLE_SOLVED]: [GameState.WAITING_FOR_VALIDATION, GameState.FAILED],
  [GameState.WAITING_FOR_VALIDATION]: [GameState.AT_CHECKPOINT, GameState.COMPLETED, GameState.FAILED],
  [GameState.COMPLETED]: [],
  [GameState.FAILED]: [],
};

@Injectable()
export class GameSessionService {
  constructor(private readonly prisma: PrismaService) {}

  async createSession(groupId: string, routeId: string) {
    return this.prisma.gameSession.create({
      data: {
        groupId,
        routeId,
      },
    });
  }

  async getSession(id: string) {
    const session = await this.prisma.gameSession.findUnique({
      where: { id },
    });
    if (!session) {
      throw new NotFoundException(`GameSession ${id} not found`);
    }
    return session;
  }

  async listSessions() {
    return this.prisma.gameSession.findMany();
  }

  async listSessionsByGroup(groupId: string) {
    return this.prisma.gameSession.findMany({
      where: { groupId },
    });
  }

  async listSessionsByRoute(routeId: string) {
    return this.prisma.gameSession.findMany({
      where: { routeId },
    });
  }

  getValidNextStates(currentState: GameState) {
    return stateTransitions[currentState] ?? [];
  }

  async transitionState(id: string, targetState: GameState) {
    const session = await this.getSession(id);
    const allowedStates = this.getValidNextStates(session.state);

    if (!allowedStates.includes(targetState)) {
      throw new BadRequestException(
        `Transition from ${session.state} to ${targetState} is not allowed`,
      );
    }

    const data: { state: GameState; startTime?: Date; endTime?: Date } = {
      state: targetState,
    };

    if (session.state === GameState.CREATED && targetState === GameState.STARTED) {
      data.startTime = new Date();
    }

    if (targetState === GameState.COMPLETED || targetState === GameState.FAILED) {
      data.endTime = new Date();
    }

    return this.prisma.gameSession.update({
      where: { id },
      data,
    });
  }

  async deleteSession(id: string) {
    // First, verify the session exists
    await this.getSession(id);
    try {
      return await this.prisma.gameSession.delete({
        where: { id },
      });
    } catch (error) {
      console.error("Prisma delete error:", error);
      if (error instanceof Error) {
        throw new BadRequestException("Failed to delete session due to a database error.", error.message);
      }
      throw new BadRequestException("Failed to delete session due to an unknown database error.");
    }
  }

  async deleteAllSessions() {
    return this.prisma.gameSession.deleteMany({});
  }
}
