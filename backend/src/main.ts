import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './prisma/prisma.service';
import { Role } from './auth/role.enum';
import * as bcrypt from 'bcrypt';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
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
  };

  await seedUsers(); // Run seeding logic

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
