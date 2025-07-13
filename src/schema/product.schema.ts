import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';
import { Iproduct } from 'src/types/types';
import { Category } from './category.schema';
import { createProductCode } from 'src/utils/create-product-code';

export type ProductDocument = HydratedDocument<Product>;

@Schema({
  timestamps: true,
})
export class Product implements Iproduct {
  @Prop({
    required: true,
    type: String,

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

  })
  description!: string;

  @Prop({
    required: true,
    type: String,
    enum: ['In Stock', 'Stock Out'],
    default: 'In Stock'
  })
  status!: 'In Stock' | 'Stock Out';

  @Prop({
    required: true,
    min: 0,
    max: 100,
  })
  discount!: number;

  // @Prop({
  //   required: true,
  //   type: mongoose.Types.ObjectId,
  //   ref: 'Category',
  // })
  // category!: Category;

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
productSchema.index(
  {
    index: 1,
  },

);

productSchema.pre('save', function (next) {
  // we are creating the unique product code of the product based on the given instruction
  this.productCode = createProductCode(this.name);

  // the product status may vary based on the state of the stock(if it is zero or not)
  this.stock  <= 0 ? this.status = "Stock Out" : this.status = "In Stock"
  next();
});

