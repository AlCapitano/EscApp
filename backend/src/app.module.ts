import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { AdminModule } from './admin/admin.module';
import { GameSessionModule } from './game-session/game-session.module';
import { CheckpointModule } from './checkpoint/checkpoint.module';
import { CheckpointAttemptModule } from './checkpoint-attempt/checkpoint-attempt.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'frontend'),
      exclude: ['/auth', '/admin', '/game-sessions', '/checkpoints', '/checkpoint-attempts'],
    }),
    PrismaModule,
    AuthModule,
    AdminModule,
    GameSessionModule,
    CheckpointModule,
    CheckpointAttemptModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
