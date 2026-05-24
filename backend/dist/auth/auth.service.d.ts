import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/register.dto';
export declare class AuthService {
    private readonly prisma;
    private readonly jwtService;
    private readonly configService;
    constructor(prisma: PrismaService, jwtService: JwtService, configService: ConfigService);
    register(createUserDto: CreateUserDto): Promise<{
        email: string;
        password: string;
        name: string | null;
        id: string;
        hashedRefreshToken: string | null;
        role: import(".prisma/client").$Enums.Role;
        createdAt: Date;
        updatedAt: Date;
    }>;
    validateUser(email: string, password: string): Promise<{
        email: string;
        password: string;
        name: string | null;
        id: string;
        hashedRefreshToken: string | null;
        role: import(".prisma/client").$Enums.Role;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    login(user: {
        id: string;
        email: string;
    }): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    getAllUsers(): Promise<{
        email: string;
        password: string;
        name: string | null;
        id: string;
        hashedRefreshToken: string | null;
        role: import(".prisma/client").$Enums.Role;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    refreshTokens(userId: string, refreshToken: string): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    verifyRefreshToken(refreshToken: string): Promise<{
        sub: string;
        email: string;
    }>;
    logout(userId: string): Promise<void>;
    getTokens(userId: string, email: string): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    updateRefreshToken(userId: string, refreshToken: string): Promise<void>;
}
