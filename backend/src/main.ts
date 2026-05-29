import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './prisma/prisma.service';
import { Role } from './auth/role.enum';
import * as bcrypt from 'bcrypt';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  const prismaService = app.get(PrismaService);

  const seedUsers = async () => {
    const adminEmail = 'admin@example.com';
    const playerEmail = 'user@example.com';
    const password = 'password'; // Use a strong password in production

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create admin user if not exists
    let adminUser = await prismaService.user.findUnique({ where: { email: adminEmail } });
    if (!adminUser) {
      adminUser = await prismaService.user.create({
        data: {
          email: adminEmail,
          password: hashedPassword,
          name: 'Admin User',
          role: Role.ADMIN,
        },
      });
      console.log(`Created admin user: ${adminUser.email}`);
    } else {
      console.log(`Admin user '${adminEmail}' already exists.`);
    }

    // Create player user if not exists
    let playerUser = await prismaService.user.findUnique({ where: { email: playerEmail } });
    if (!playerUser) {
      playerUser = await prismaService.user.create({
        data: {
          email: playerEmail,
          password: hashedPassword,
          name: 'Normal User',
          role: Role.PLAYER,
        },
      });
      console.log(`Created player user: ${playerUser.email}`);
    } else {
      console.log(`Player user '${playerEmail}' already exists.`);
    }

    // --- Seed a Game Session for testing ---
    let route = await prismaService.route.findUnique({ where: { name: 'Test Route' } });
    if (!route) {
      route = await prismaService.route.create({
        data: {
          name: 'Test Route',
          city: 'Test City',
          description: 'A route for testing.',
        },
      });
    }

    let checkpoint = await prismaService.checkpoint.findUnique({ where: { id: 'test-checkpoint-1' } });
    if (!checkpoint) {
      checkpoint = await prismaService.checkpoint.create({
        data: {
          id: 'test-checkpoint-1',
          routeId: route.id,
          order: 1,
          name: 'First Test Checkpoint',
          latitude: 0,
          longitude: 0,
        },
      });
    }
    
    let group = await prismaService.group.findUnique({ where: { name: 'Test Group' } });
    if (!group) {
        group = await prismaService.group.create({
            data: {
                name: 'Test Group',
                leaderId: adminUser.id,
            },
        });
    }

    // Ensure the player is in the group
    await prismaService.groupMember.upsert({
        where: { groupId_userId: { groupId: group.id, userId: playerUser.id } },
        update: {},
        create: {
            groupId: group.id,
            userId: playerUser.id,
        },
    });

    // Create a game session only if one doesn't already exist for this group on this route
    let gameSession = await prismaService.gameSession.findFirst({
        where: { groupId: group.id, routeId: route.id },
    });

    if (!gameSession) {
        gameSession = await prismaService.gameSession.create({
            data: {
                groupId: group.id,
                routeId: route.id,
                score: 100, // Give it a score to appear on leaderboard
            },
        });

        await prismaService.checkpointAttempt.create({
            data: {
                sessionId: gameSession.id,
                checkpointId: checkpoint.id,
                answer: 'test',
                correct: true,
            },
        });
    }
    
    console.log('Finished seeding additional test data.');
  };

  await seedUsers(); // Run seeding logic

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
