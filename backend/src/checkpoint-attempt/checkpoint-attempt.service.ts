import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCheckpointAttemptDto } from './dto/create-checkpoint-attempt.dto';

@Injectable()
export class CheckpointAttemptService {
  constructor(private readonly prisma: PrismaService) {}

  async createAttempt(dto: CreateCheckpointAttemptDto) {
    const { sessionId, checkpointId, answer } = dto;

    const puzzle = await this.prisma.puzzle.findUnique({
      where: { checkpointId },
    });

    if (!puzzle) {
      throw new NotFoundException(`Puzzle for checkpoint ${checkpointId} not found`);
    }

    const isCorrect = puzzle.answer.toLowerCase() === answer.toLowerCase();

    // TODO: Add logic to update score on GameSession if correct

    return this.prisma.checkpointAttempt.create({
      data: {
        sessionId,
        checkpointId,
        answer,
        correct: isCorrect,
      },
    });
  }
}
