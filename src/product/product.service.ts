import { CategoryService } from './../category/category.service';
import {
  BadRequestException,
  ConflictException,
  forwardRef,
  HttpException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { createProductCode } from 'src/utils/create-product-code';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from 'src/schema/product.schema';
import { Model } from 'mongoose';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
    @Inject(forwardRef(() => CategoryService))
    private readonly categoryService: CategoryService,
  ) {}

  // first to create a new product
  async create(createProductDto: CreateProductDto) {
    const category = await this.categoryService.getByName(
      createProductDto.category,
    );
    if (!category[0]) {
      throw new NotFoundException(
        'No valid categories are there based on given one',
      );
    }
    const newProduct = new this.productModel({
      ...createProductDto,
      productCode: createProductCode(createProductDto.name),
      category: category[0]._id,
    });
    return await newProduct.save();
  }

  async findAll(category, search) {
    const filter: any = {};

    // if the user filtering the products by category name in query
    if (category) {
      const categories = await this.categoryService.getByName(category);
      filter.category = categories[0]?._id;
    }

    // if the user filters the product by search name
    if (search) {
      filter.name = {
        $regex: search,
        $options: 'i',
      };
    }
    const result = await this.productModel.find(filter).populate('category');

    if (!result[0]) {
      throw new NotFoundException('No product were found in this query');
    }
    return result;
  }

  async findOne(id) {
    const item = await this.productModel.findById(id).populate('category');
    if (!item?.name) {
      throw new NotFoundException('No products were found in the given id');
    }
    return item;
  }

  async update(id, updateProductDto: UpdateProductDto) {
    let product = await this.findOne(id);
    const udpatedProduct = await this.productModel.findByIdAndUpdate(
      id,
      {
        ...updateProductDto,
      },
      {
        new: true,
      },
    );
    return udpatedProduct;
  }

  async remove(id) {
    try {
      const product = await this.findOne(id);
      if (!product) {
        throw new NotFoundException('No product found in this Id.');
      }
      return await product.deleteOne();
    } catch (error: any) {
      throw new Error(error?.message);
    }
  }
}
