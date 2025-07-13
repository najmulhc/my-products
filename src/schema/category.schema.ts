import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Icategory } from 'src/types/types';

export type CategoryDocument = HydratedDocument<Category>;

@Schema({
  timestamps: true,
})
export class Category implements Icategory {
  @Prop({
    unique: true,
    required: true,
  })
  name!: string;


  @Prop({
    required: false,
    unique: false
  })
  description!: string;

 
}

export const categorySchema = SchemaFactory.createForClass(Category);
categorySchema.index({index : 1}, {unique: true})
