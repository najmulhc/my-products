import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';

export class DiscountInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>) {
    return next.handle().pipe(map((product) => this.giveDiscount(product)));
  }

  giveDiscount = (product) => {
    const discountedPrice =
      product.price - product.price * (product.discount / 100);
    return { ...product, discountedPrice };
  };
}
