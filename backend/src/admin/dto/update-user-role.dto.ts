import { IsEnum } from 'class-validator';
import { Role } from '../../auth/role.enum';

export class UpdateUserRoleDto {
  @IsEnum(Role)
  role!: Role;
}
