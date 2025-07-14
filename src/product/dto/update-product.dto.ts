import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class UpdateProductDto {
  @IsOptional()
  @ApiProperty()
  @IsString()
  description!: string;

  @IsOptional()
  @ApiProperty()
  @IsNumber()
  @Min(0)
  @Max(100)
  discount!: number;
}
