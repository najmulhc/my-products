import {
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString
} from 'class-validator';

export class createCategoryDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsOptional()
  description!: string;
}

export class paramsDto {
  @IsMongoId()
  @IsString()
  id: string | undefined;
}
