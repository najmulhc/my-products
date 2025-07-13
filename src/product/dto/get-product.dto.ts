import { Expose, Transform } from 'class-transformer';

export class getProductDto {
  @Expose()
  name!: string;

  @Expose()
  description!: string;

  @Expose()
  price!: number;

  @Expose()
  discount!: number;

  // transform the response with the discoutned final price
  @Expose()
  @Transform(({ obj }) => {
    return Math.round(obj.price * (1 - obj.discount / 100));
  })
  finalPrice!: number;

  @Expose()
  image!: string;

  @Expose()
  status!: string;

  @Expose()
  productCode!: string;

  @Expose()
  stock!: number;

  @Expose()
  @Transform(({obj}) => obj.category.name)
  category!: string
}
