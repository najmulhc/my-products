import { ApiProperty } from '@nestjs/swagger';
import {
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString
} from 'class-validator';

export class createCategoryDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  description!: string;
}

export class paramsDto {
  @ApiProperty()
  @IsMongoId()
  @IsString()
  id: string | undefined;
}
