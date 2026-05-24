import { IsUUID } from 'class-validator';

export class CreateGameSessionDto {
  @IsUUID()
  groupId!: string;

  @IsUUID()
  routeId!: string;
}
