import { Module } from '@nestjs/common';
import { CheckpointAttemptController } from './checkpoint-attempt.controller';
import { CheckpointAttemptService } from './checkpoint-attempt.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CheckpointAttemptController],
  providers: [CheckpointAttemptService],
})
export class CheckpointAttemptModule {}
