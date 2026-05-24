import { GameSessionService } from './game-session.service';
import { CreateGameSessionDto } from './dto/create-game-session.dto';
import { UpdateGameStateDto } from './dto/update-game-state.dto';
export declare class GameSessionController {
    private readonly gameSessionService;
    constructor(gameSessionService: GameSessionService);
    create(dto: CreateGameSessionDto): Promise<{
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
    findAll(): Promise<{
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
    findByGroup(groupId: string): Promise<{
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
    findByRoute(routeId: string): Promise<{
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
    findOne(id: string): Promise<{
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
    getNextStates(id: string): Promise<{
        currentState: import(".prisma/client").$Enums.GameState;
        nextStates: import("../game-states.enum").GameState[];
    }>;
    transition(id: string, dto: UpdateGameStateDto): Promise<{
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
