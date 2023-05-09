import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  isURL,
} from 'class-validator';

export class ShortUrlDto {
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsNotEmpty()
  // @isURL()
  fullUrl: string;

  @IsOptional()
  @IsString()
  shortCode?: string;

  @IsOptional()
  @IsNumber()
  hitCount?: number;

  @IsOptional()
  @IsBoolean()
  isExpired?: boolean;

  @IsOptional()
  @IsDateString()
  expiredAt?: Date;

  @IsOptional()
  @IsDateString()
  createdAt?: Date;

  @IsOptional()
  @IsDateString()
  updatedAt?: Date;
}
