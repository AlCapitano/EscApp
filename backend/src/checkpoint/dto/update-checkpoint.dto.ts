import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateCheckpointDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNumber()
  latitude?: number;

  @IsOptional()
  @IsNumber()
  longitude?: number;
}
