"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameSessionService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const game_states_enum_1 = require("../game-states.enum");
const stateTransitions = {
    [game_states_enum_1.GameState.CREATED]: [game_states_enum_1.GameState.STARTED],
    [game_states_enum_1.GameState.STARTED]: [game_states_enum_1.GameState.AT_CHECKPOINT, game_states_enum_1.GameState.FAILED],
    [game_states_enum_1.GameState.AT_CHECKPOINT]: [game_states_enum_1.GameState.PUZZLE_ACTIVE, game_states_enum_1.GameState.FAILED],
    [game_states_enum_1.GameState.PUZZLE_ACTIVE]: [game_states_enum_1.GameState.PUZZLE_SOLVED, game_states_enum_1.GameState.FAILED],
    [game_states_enum_1.GameState.PUZZLE_SOLVED]: [game_states_enum_1.GameState.WAITING_FOR_VALIDATION, game_states_enum_1.GameState.FAILED],
    [game_states_enum_1.GameState.WAITING_FOR_VALIDATION]: [game_states_enum_1.GameState.AT_CHECKPOINT, game_states_enum_1.GameState.COMPLETED, game_states_enum_1.GameState.FAILED],
    [game_states_enum_1.GameState.COMPLETED]: [],
    [game_states_enum_1.GameState.FAILED]: [],
};
let GameSessionService = class GameSessionService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createSession(groupId, routeId) {
        return this.prisma.gameSession.create({
            data: {
                groupId,
                routeId,
            },
        });
    }
    async getSession(id) {
        const session = await this.prisma.gameSession.findUnique({
            where: { id },
        });
        if (!session) {
            throw new common_1.NotFoundException(`GameSession ${id} not found`);
        }
        return session;
    }
    async listSessions() {
        return this.prisma.gameSession.findMany();
    }
    async listSessionsByGroup(groupId) {
        return this.prisma.gameSession.findMany({
            where: { groupId },
        });
    }
    async listSessionsByRoute(routeId) {
        return this.prisma.gameSession.findMany({
            where: { routeId },
        });
    }
    getValidNextStates(currentState) {
        return stateTransitions[currentState] ?? [];
    }
    async transitionState(id, targetState) {
        const session = await this.getSession(id);
        const allowedStates = this.getValidNextStates(session.state);
        if (!allowedStates.includes(targetState)) {
            throw new common_1.BadRequestException(`Transition from ${session.state} to ${targetState} is not allowed`);
        }
        const data = {
            state: targetState,
        };
        if (session.state === game_states_enum_1.GameState.CREATED && targetState === game_states_enum_1.GameState.STARTED) {
            data.startTime = new Date();
        }
        if (targetState === game_states_enum_1.GameState.COMPLETED || targetState === game_states_enum_1.GameState.FAILED) {
            data.endTime = new Date();
        }
        return this.prisma.gameSession.update({
            where: { id },
            data,
        });
    }
};
exports.GameSessionService = GameSessionService;
exports.GameSessionService = GameSessionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], GameSessionService);
//# sourceMappingURL=game-session.service.js.map