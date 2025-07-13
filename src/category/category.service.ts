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
    try {
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
      const { name } = category;
      const existingCategory = await this.categoryModel.findOne({
        name,
      });
      if (existingCategory?.name) { // if we have an allready existing category with the same name
        throw new ConflictException('We allready have this category');
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

  // for deleting categories
  async deleteCategory(id: string) {
    try {
      // TODO: first we need to find if there is any product associated with this category, if so we will return an error that you can not delete any category that is associated with one or multiple products
      return await this.categoryModel.findByIdAndDelete(id);
    } catch (error) {
      throw error;
    }
  }
}
