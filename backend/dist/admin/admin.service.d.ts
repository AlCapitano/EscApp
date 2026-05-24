import { Role as PrismaRole } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
export declare class AdminService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    listUsers(): Promise<{
        email: string;
        name: string | null;
        id: string;
        role: import(".prisma/client").$Enums.Role;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    getUserById(id: string): Promise<{
        email: string;
        name: string | null;
        id: string;
        role: import(".prisma/client").$Enums.Role;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    updateUserRole(id: string, role: PrismaRole): Promise<{
        email: string;
        password: string;
        name: string | null;
        id: string;
        hashedRefreshToken: string | null;
        role: import(".prisma/client").$Enums.Role;
        createdAt: Date;
        updatedAt: Date;
    }>;
    deleteUser(id: string): Promise<{
        email: string;
        password: string;
        name: string | null;
        id: string;
        hashedRefreshToken: string | null;
        role: import(".prisma/client").$Enums.Role;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getSystemStats(): Promise<{
        users: number;
        groups: number;
        routes: number;
        sessions: number;
    }>;
}
