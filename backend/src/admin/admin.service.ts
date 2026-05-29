import { Injectable } from '@nestjs/common';
import { Role as PrismaRole } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  async listUsers() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async getUserById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async updateUserRole(id: string, role: PrismaRole) {
    return this.prisma.user.update({
      where: { id },
      data: { role },
    });
  }

  async deleteUser(id: string) {
    return this.prisma.user.delete({
      where: { id },
    });
  }

  async getSystemStats() {
    const [users, groups, routes, sessions] = await Promise.all([
      this.prisma.user.count(),
      this.prisma.group.count(),
      this.prisma.route.count(),
      this.prisma.gameSession.count(),
    ]);
    return { users, groups, routes, sessions };
  }

  async usersProgress() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        unlockedCheckpoints: true,
      },
    });
  }
}
