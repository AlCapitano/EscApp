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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameSessionController = void 0;
const common_1 = require("@nestjs/common");
const game_session_service_1 = require("./game-session.service");
const create_game_session_dto_1 = require("./dto/create-game-session.dto");
const update_game_state_dto_1 = require("./dto/update-game-state.dto");
let GameSessionController = class GameSessionController {
    gameSessionService;
    constructor(gameSessionService) {
        this.gameSessionService = gameSessionService;
    }
    create(dto) {
        return this.gameSessionService.createSession(dto.groupId, dto.routeId);
    }
    findAll() {
        return this.gameSessionService.listSessions();
    }
    findByGroup(groupId) {
        return this.gameSessionService.listSessionsByGroup(groupId);
    }
    findByRoute(routeId) {
        return this.gameSessionService.listSessionsByRoute(routeId);
    }
    findOne(id) {
        return this.gameSessionService.getSession(id);
    }
    async getNextStates(id) {
        const session = await this.gameSessionService.getSession(id);
        return {
            currentState: session.state,
            nextStates: this.gameSessionService.getValidNextStates(session.state),
        };
    }
    transition(id, dto) {
        return this.gameSessionService.transitionState(id, dto.targetState);
    }
};
exports.GameSessionController = GameSessionController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_game_session_dto_1.CreateGameSessionDto]),
    __metadata("design:returntype", void 0)
], GameSessionController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], GameSessionController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('group/:groupId'),
    __param(0, (0, common_1.Param)('groupId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], GameSessionController.prototype, "findByGroup", null);
__decorate([
    (0, common_1.Get)('route/:routeId'),
    __param(0, (0, common_1.Param)('routeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], GameSessionController.prototype, "findByRoute", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], GameSessionController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)(':id/next-states'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GameSessionController.prototype, "getNextStates", null);
__decorate([
    (0, common_1.Patch)(':id/state'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_game_state_dto_1.UpdateGameStateDto]),
    __metadata("design:returntype", void 0)
], GameSessionController.prototype, "transition", null);
exports.GameSessionController = GameSessionController = __decorate([
    (0, common_1.Controller)('game-sessions'),
    __metadata("design:paramtypes", [game_session_service_1.GameSessionService])
], GameSessionController);
//# sourceMappingURL=game-session.controller.js.map