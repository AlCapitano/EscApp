import { Module } from '@nestjs/common';
import { CheckpointController } from './checkpoint.controller';
import { CheckpointService } from './checkpoint.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CheckpointController],
  providers: [CheckpointService],
})
export class CheckpointModule {}
