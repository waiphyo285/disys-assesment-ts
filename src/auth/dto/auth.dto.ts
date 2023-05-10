import { IsNumber, IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
  @IsOptional()
  @IsNumber()
  id?: number;

  @ApiProperty({
    description: 'Enter Username',
    default: 'hellojwt',
  })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({
    description: 'Enter Password',
    default: 'worldjwt',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
