import { forwardRef, Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, categorySchema } from 'src/schema/category.schema';
import { ProductModule } from 'src/product/product.module';
import { Product, productSchema } from 'src/schema/product.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Category.name,
        schema: categorySchema,
      }, {
        name: Product.name,
        schema: productSchema
      }
    ]), forwardRef(() => ProductModule)
  ],
  controllers: [CategoryController],
  providers: [CategoryService],
  exports: [
   CategoryService
  ]
})
export class CategoryModule {}
