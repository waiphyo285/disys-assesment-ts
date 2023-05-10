import {
  IsUrl,
  IsNumber,
  IsString,
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  Validate,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Blacklists } from '../../helpers/constant';

@ValidatorConstraint()
class hasBlacklistUrl implements ValidatorConstraintInterface {
  async validate(fullUrl: string, args: ValidationArguments) {
    // check url is containted in black list!
    const isValidUrl = !Blacklists.test(fullUrl);

    return isValidUrl;
  }
  defaultMessage(args: ValidationArguments) {
    return `The provided URL can not create a short link`;
  }
}

export class ShortUrlDto {
  @IsOptional()
  @IsNumber()
  id?: number;

  @ApiProperty({
    description: 'Enter URL',
    default: 'https://hello.com/world',
  })
  @IsNotEmpty()
  @IsUrl()
  @Validate(hasBlacklistUrl)
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

  @ApiProperty()
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
