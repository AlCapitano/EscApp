import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CheckpointAttemptService } from './checkpoint-attempt.service';
import { CreateCheckpointAttemptDto } from './dto/create-checkpoint-attempt.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('checkpoint-attempts')
@UseGuards(JwtAuthGuard)
export class CheckpointAttemptController {
  constructor(private readonly checkpointAttemptService: CheckpointAttemptService) {}

  @Post()
  create(@Body() dto: CreateCheckpointAttemptDto) {
    return this.checkpointAttemptService.createAttempt(dto);
  }
}
