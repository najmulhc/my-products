import {
  IsNumber,
  IsPositive,
  IsString,
  IsUrl,
  Max,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  name!: string;

  @IsString()
  description!: string;

  @IsNumber()
  @IsPositive()
  price!: number;

  @IsString()
  @IsUrl()
  image!: string;

  @IsNumber()
  stock!: number;

  @IsNumber()
  @Min(0)
  @Max(100)
  discount!: number;
}
