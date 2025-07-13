import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from 'src/schema/product.schema';
import { createProductCode } from 'src/utils/create-product-code';
import { CategoryService } from './../category/category.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
    @Inject(forwardRef(() => CategoryService))
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
    } catch (error) {
      throw error;
    }
  }

  async findAll(category, search) {
    try {
      const filter: any = {};

      if (category) {
        const categories = await this.categoryService.getByName(category);
        filter.category = categories[0]?._id;
      }
      
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
    } catch (error) {
      throw error;
    }
  }

  async findOne(id) {
    try {
      const item = await this.productModel.findById(id).populate('category');
      if (!item?.name) {
        throw new NotFoundException('No products were found in the given id');
      }
      return item;
    } catch (error) {
      throw error;
    }
  }

  async update(id, updateProductDto: UpdateProductDto) {
    try {
      let product = await this.findOne(id);
      const updatedProduct = await this.productModel.findByIdAndUpdate(
        id,
        {
          ...updateProductDto,
        },
        {
          new: true,
        },
      );
      return updatedProduct;
    } catch (error) {
      throw error;
    }
  }

  async delete(id) {
    try {
      const product = await this.findOne(id);
      if (!product) {
        throw new NotFoundException('No product found in this Id.');
      }
      return await product.deleteOne();
    } catch (error) {
      throw error;
    }
  }
}
