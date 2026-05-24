import { AdminService } from './admin.service';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    listUsers(): Promise<{
        email: string;
        name: string | null;
        id: string;
        role: import(".prisma/client").$Enums.Role;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    getUser(id: string): Promise<{
        email: string;
        name: string | null;
        id: string;
        role: import(".prisma/client").$Enums.Role;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    updateUserRole(id: string, dto: UpdateUserRoleDto): Promise<{
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
    getStats(): Promise<{
        users: number;
        groups: number;
        routes: number;
        sessions: number;
    }>;
}
