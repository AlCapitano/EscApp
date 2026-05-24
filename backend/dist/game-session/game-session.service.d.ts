import { PrismaService } from '../prisma/prisma.service';
import { GameState } from '../game-states.enum';
export declare class GameSessionService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createSession(groupId: string, routeId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        state: import(".prisma/client").$Enums.GameState;
        startTime: Date | null;
        endTime: Date | null;
        score: number;
        groupId: string;
        routeId: string;
    }>;
    getSession(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        state: import(".prisma/client").$Enums.GameState;
        startTime: Date | null;
        endTime: Date | null;
        score: number;
        groupId: string;
        routeId: string;
    }>;
    listSessions(): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        state: import(".prisma/client").$Enums.GameState;
        startTime: Date | null;
        endTime: Date | null;
        score: number;
        groupId: string;
        routeId: string;
    }[]>;
    listSessionsByGroup(groupId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        state: import(".prisma/client").$Enums.GameState;
        startTime: Date | null;
        endTime: Date | null;
        score: number;
        groupId: string;
        routeId: string;
    }[]>;
    listSessionsByRoute(routeId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        state: import(".prisma/client").$Enums.GameState;
        startTime: Date | null;
        endTime: Date | null;
        score: number;
        groupId: string;
        routeId: string;
    }[]>;
    getValidNextStates(currentState: GameState): GameState[];
    transitionState(id: string, targetState: GameState): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        state: import(".prisma/client").$Enums.GameState;
        startTime: Date | null;
        endTime: Date | null;
        score: number;
        groupId: string;
        routeId: string;
    }>;
}
