import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class getCategoryDto {
  @ApiProperty()
  @Expose()
  id!: string;

  @ApiProperty()
  @Expose()
  name!: string;

  @ApiProperty()
  @Expose()
  description!: string;
}
