import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsPositive,
  IsString,
  IsUrl,
  Max,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty()
  @IsString()
  name!: string;

  @ApiProperty()
  @IsString()
  description!: string;

  @ApiProperty()
  @IsString()
  category!: string;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  price!: number;

  @ApiProperty()
  @IsString()
  @IsUrl()
  image!: string;

  @ApiProperty()
  @IsNumber()
  stock!: number;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  @Max(100)
  discount!: number;
}
