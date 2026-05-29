import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateCheckpointDto } from './dto/update-checkpoint.dto';

@Injectable()
export class CheckpointService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.checkpoint.findMany();
  }

  async findOne(id: string) {
    const checkpoint = await this.prisma.checkpoint.findUnique({ where: { id } });
    if (!checkpoint) {
      throw new NotFoundException(`Checkpoint with ID "${id}" not found`);
    }
    return checkpoint;
  }

  async update(id: string, dto: UpdateCheckpointDto) {
    // First, verify the checkpoint exists
    await this.findOne(id);
    
    return this.prisma.checkpoint.update({
      where: { id },
      data: dto,
    });
  }
}
