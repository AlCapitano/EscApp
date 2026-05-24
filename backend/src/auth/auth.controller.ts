import { Body, Controller, Get, Post, Patch, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Roles } from './roles.decorator';
import { RolesGuard } from './roles.guard';
import { Role } from './role.enum';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: CreateUserDto) {
    const user = await this.authService.register(dto);
    return { id: user.id, email: user.email, name: user.name, role: user.role };
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    const user = await this.authService.validateUser(dto.email, dto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.authService.login({ id: user.id, email: user.email });
  }

  @Post('refresh')
  async refresh(@Body() dto: RefreshTokenDto) {
    const payload = await this.authService.verifyRefreshToken(dto.refreshToken);
    return this.authService.refreshTokens(payload.sub, dto.refreshToken);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getProfile(@Req() req: any) {
    return {
      id: req.user.userId,
      email: req.user.email,
      name: req.user.name,
      role: req.user.role,
    };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get('admin/users')
  async getAllUsers() {
    const users = await this.authService.getAllUsers();
    return users.map((user) => ({ id: user.id, email: user.email, name: user.name, role: user.role }));
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Req() req: any) {
    await this.authService.logout(req.user.userId);
    return { loggedOut: true };
  }
}
