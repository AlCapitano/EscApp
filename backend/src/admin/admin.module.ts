import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PassportModule, PrismaModule],
  controllers: [AdminController],
  providers: [AdminService, JwtAuthGuard, RolesGuard],
})
export class AdminModule {}
