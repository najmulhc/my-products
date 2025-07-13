import { Expose, Transform } from 'class-transformer';

export class getProductDto {
  @Expose()
  name!: string;

  @Expose()
  price!: number;

  @Expose()
  discount!: number;

  // transform the response with the discoutned final price
  @Expose()
  @Transform(({ obj }) => {
    return Math.round(obj.price * (1 - obj.discount / 100))
  })
  finalPrice!: number;
}
