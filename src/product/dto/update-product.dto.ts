import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Max, Min } from 'class-validator';

export class UpdateProductDto {
    @ApiProperty()
    @IsString()
  description!: string;

    @ApiProperty()
    @IsNumber()
    @Min(0)
    @Max(100)
    discount!: number;
}
