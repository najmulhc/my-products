import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, productSchema } from 'src/schema/product.schema'; 
import { CategoryModule } from 'src/category/category.module';

@Module({
  imports: [  MongooseModule.forFeature([
    {
      name: Product.name,
      schema: productSchema
    }
  ]), CategoryModule],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
