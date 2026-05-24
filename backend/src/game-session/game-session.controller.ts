import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { GameSessionService } from './game-session.service';
import { CreateGameSessionDto } from './dto/create-game-session.dto';
import { UpdateGameStateDto } from './dto/update-game-state.dto';

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
}
