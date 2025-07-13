import { Expose } from "class-transformer";

export class getCategoryDto {
  @Expose()
  id!: string

  @Expose()
  name!: string

  @Expose()
  description!: string
}
