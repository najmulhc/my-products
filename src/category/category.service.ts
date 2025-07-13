import mongoose, { ObjectId } from 'mongoose';
import { Category } from 'src/schema/category.schema';
import {
  BadRequestException,
  ConflictException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { createCategoryDto } from './dto/category.dto';
import { trycatch } from 'src/utils/trycatch';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}

  async getAll() {
    try {
      const categories = await this.categoryModel.find();
      if (!categories[0]) {
        throw new NotFoundException(
          'There is no categories in the database. Please insert one. ',
        );
      }
      return categories;
    } catch (error) {
      throw error;
    }
  }

  // if you need single category to fetch
  async getById(id: string) {
    try  {
      const category = await this.categoryModel.findById(id);
      if (!category) {
        throw new NotFoundException('No category found with the given ID.');
      }

      return { category };
    } catch (error) {
      throw error; 
    }
  }

  // for handling POST request of the categories
  async create(category: createCategoryDto) {
    try {
      const existing = await this.categoryModel.find({
        name: category.name,
      });
      if (existing) {
        throw new ConflictException('Allready this category exists.');
      }
      const item = new this.categoryModel(category);

      return item.save();
    } catch (error) {
      throw error;
    }
  }

  // for updating any existing category
  async updateCategory(id: string, updatedCategory: createCategoryDto) {
    try {
      const updated = await this.categoryModel.findByIdAndUpdate(
        id,
        {
          ...updatedCategory,
        },
        {
          new: true,
        },
      );

      if (!updated) {
        throw new NotFoundException('No category found in the given id.');
      }
      return updated;
    } catch (error) {
      throw error;
    }
  }

  // for deleting
  async deleteCategory(id: string) {
    try {
      return await this.categoryModel.findByIdAndDelete(id);
    } catch (error) {
      throw error;
    }
  }
}
