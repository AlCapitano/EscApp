import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(dto: CreateUserDto): Promise<{
        id: string;
        email: string;
        name: string | null;
        role: import(".prisma/client").$Enums.Role;
    }>;
    login(dto: LoginDto): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    refresh(dto: RefreshTokenDto): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    getProfile(req: any): Promise<{
        id: any;
        email: any;
        name: any;
        role: any;
    }>;
    getAllUsers(): Promise<{
        id: string;
        email: string;
        name: string | null;
        role: import(".prisma/client").$Enums.Role;
    }[]>;
    logout(req: any): Promise<{
        loggedOut: boolean;
    }>;
}
