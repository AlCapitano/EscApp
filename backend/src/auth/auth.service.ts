import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: createUserDto.email },
    });
    if (existingUser) {
      throw new UnauthorizedException('Email is already registered');
    }

    const passwordHash = await bcrypt.hash(createUserDto.password, 10);
    return this.prisma.user.create({
      data: {
        email: createUserDto.email,
        name: createUserDto.name,
        password: passwordHash,
      },
    });
  }

  async validateUser(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      return null;
    }

    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) {
      return null;
    }

    return user;
  }

  async login(user: { id: string; email: string }) {
    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRefreshToken(user.id, tokens.refresh_token);
    return tokens;
  }

  async getAllUsers() {
    return this.prisma.user.findMany();
  }

  async refreshTokens(userId: string, refreshToken: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user || !user.hashedRefreshToken) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const refreshTokenMatches = await bcrypt.compare(refreshToken, user.hashedRefreshToken);
    if (!refreshTokenMatches) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRefreshToken(user.id, tokens.refresh_token);
    return tokens;
  }

  async verifyRefreshToken(refreshToken: string) {
    try {
      return this.jwtService.verifyAsync<{ sub: string; email: string }>(refreshToken, {
        secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET') ?? 'refresh-secret',
      });
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async logout(userId: string) {
    await this.prisma.user.update({
      where: { id: userId },
      data: { hashedRefreshToken: null },
    });
  }

  async getTokens(userId: string, email: string) {
    const payload = { sub: userId, email };
    const accessToken = await this.jwtService.signAsync(payload as any, {
      expiresIn: this.configService.get<string>('JWT_ACCESS_TOKEN_EXPIRATION') ?? '15m',
    } as any);

    const refreshToken = await this.jwtService.signAsync(payload as any, {
      secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET') ?? 'refresh-secret',
      expiresIn: this.configService.get<string>('JWT_REFRESH_TOKEN_EXPIRATION') ?? '7d',
    } as any);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async updateRefreshToken(userId: string, refreshToken: string) {
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.prisma.user.update({
      where: { id: userId },
      data: { hashedRefreshToken },
    });
  }
}
