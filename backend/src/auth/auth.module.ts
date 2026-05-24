import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { PrismaModule } from '../prisma/prisma.module';
import { RolesGuard } from './roles.guard';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const expiresIn = configService.get<string>('JWT_ACCESS_TOKEN_EXPIRATION') ?? '15m';
        return {
          secret: configService.get<string>('JWT_ACCESS_TOKEN_SECRET') ?? 'access-secret',
          signOptions: {
            expiresIn: expiresIn as any,
          },
        };
      },
    }),
    PrismaModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, RolesGuard],
  exports: [AuthService],
})
export class AuthModule {}
