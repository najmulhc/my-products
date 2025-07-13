import { ObjectId } from 'mongoose';

export interface Iproduct {
  name: string;
  description: string;
  image?: string;
  price: number;
  status: 'In Stock' | 'Stock Out';
  productCode: string;
  discount: number;
  stock: number;
  category: Icategory;
}

export interface Icategory {
  name: string;
  description: string;
}
