import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';
import { Iproduct } from 'src/types/types';
import { Category } from './category.schema';

export type ProductDocument = HydratedDocument<Product>;

@Schema({
  timestamps: true,
})
export class Product implements Iproduct {
  @Prop({
    required: true,
    type: String,
    unique: true,
  })
  name!: string;

  @Prop({
    type: String,
    required: false,
  })
  image?: string | undefined;

  @Prop({
    required: true,
    type: Number,
    min: 0,
  })
  price!: number;

  @Prop({
    required: true,
    type: String,
    unique: true,
  })
  description!: string;

  @Prop({
    required: true,
    type: String,
    enum: ['In Stock', 'Stock Out'],
  })
  status!: 'In Stock' | 'Stock Out';

  @Prop({
    required: true,
    min: 0,
    max: 100,
  })
  discount!: number;

  @Prop({
    required: true,
    type: mongoose.Types.ObjectId,
    ref: 'Category',
  })
  category!: Category;

  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  productCode!: string;

  @Prop({
    type: Number,
    min: 0,
  })
  stock!: number;
}

export const productSchema = SchemaFactory.createForClass(Product);
productSchema.index({
  index: 1
}, {
  unique: true
})
