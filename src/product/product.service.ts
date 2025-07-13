import { CategoryService } from './../category/category.service';
import {
  BadRequestException,
  ConflictException,
  HttpException,
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
    private readonly categoryService: CategoryService,
  ) {}

  // first to create a new product
  async create(createProductDto: CreateProductDto) {
    try {
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
    } catch (error: any) {
      if (error?.code === 11000) {
        // we are validating if there is any duplicate data in our db
        throw new ConflictException(error.message);
      }
      throw new BadRequestException(error.message);
    }
  }

  async findAll(category, search) {
    const filter: any = { }

    // if the user filtering the products by category name in query
    if (category) {
      const categories = await this.categoryService.getByName(category);
      filter.category = categories[0]?._id;
    }

    // if the user filters the product by search name
    if (search) {
      filter.name = {
        $regex: search,
        $options: 'i'
      }
    }
    return this.productModel
      .find( filter )
      .populate('category');
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
