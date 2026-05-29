import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { GameSessionService } from './game-session.service';
import { CreateGameSessionDto } from './dto/create-game-session.dto';
import { UpdateGameStateDto } from './dto/update-game-state.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../auth/role.enum';

@Controller('game-sessions')
export class GameSessionController {
  constructor(private readonly gameSessionService: GameSessionService) {}

  @Post()
  create(@Body() dto: CreateGameSessionDto) {
    return this.gameSessionService.createSession(dto.groupId, dto.routeId);
  }

  @Get()
  findAll() {
    return this.gameSessionService.listSessions();
  }

  @Get('group/:groupId')
  findByGroup(@Param('groupId') groupId: string) {
    return this.gameSessionService.listSessionsByGroup(groupId);
  }

  @Get('route/:routeId')
  findByRoute(@Param('routeId') routeId: string) {
    return this.gameSessionService.listSessionsByRoute(routeId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gameSessionService.getSession(id);
  }

  @Get(':id/next-states')
  async getNextStates(@Param('id') id: string) {
    const session = await this.gameSessionService.getSession(id);
    return {
      currentState: session.state,
      nextStates: this.gameSessionService.getValidNextStates(session.state),
    };
  }

  @Patch(':id/state')
  transition(@Param('id') id: string, @Body() dto: UpdateGameStateDto) {
    return this.gameSessionService.transitionState(id, dto.targetState);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  remove(@Param('id') id: string) {
    console.log(`[Admin] Attempting to delete session with ID: ${id}`);
    return this.gameSessionService.deleteSession(id);
  }

  @Delete()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  removeAll() {
    console.log('[Admin] Attempting to delete all sessions');
    return this.gameSessionService.deleteAllSessions();
  }
}
