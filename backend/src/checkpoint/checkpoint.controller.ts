import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { CheckpointService } from './checkpoint.service';
import { UpdateCheckpointDto } from './dto/update-checkpoint.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../auth/role.enum';

@Controller('checkpoints')
export class CheckpointController {
  constructor(private readonly checkpointService: CheckpointService) {}

  @Get()
  findAll() {
    return this.checkpointService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.checkpointService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  update(@Param('id') id: string, @Body() dto: UpdateCheckpointDto) {
    return this.checkpointService.update(id, dto);
  }
}
