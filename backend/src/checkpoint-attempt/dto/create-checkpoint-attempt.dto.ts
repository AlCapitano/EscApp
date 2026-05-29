import { IsString, IsUUID } from 'class-validator';

export class CreateCheckpointAttemptDto {
  @IsUUID()
  sessionId!: string;

  @IsUUID()
  checkpointId!: string;

  @IsString()
  answer!: string;
}
