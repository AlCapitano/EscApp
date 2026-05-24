import { IsEnum } from 'class-validator';
import { GameState } from '../../game-states.enum';

export class UpdateGameStateDto {
  @IsEnum(GameState)
  targetState!: GameState;
}
