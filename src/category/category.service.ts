import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from 'src/schema/category.schema';
import { Product } from 'src/schema/product.schema';
import { createCategoryDto } from './dto/category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
    @InjectModel(Product.name) private productModel: Model<Product>,
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

      return category;
    } catch (error) {
      throw error;
    }
  }

  async getByName(name: string) {
    try {
      const categories = await this.categoryModel.find({
        name: {
          $regex: name,
          $options: 'i',
        },
      });
      if (!categories) {
        throw new NotFoundException('No categories found in the given string');
      }
      return categories;
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
      if (existingCategory?.name) {
        // if we have an allready existing category with the same name
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
      // testing if there is some products in this category(we can not delete a category if that has some products in it)
      const products = await this.productModel.find({
        category: id,
      });

      if (products[0]) {
        throw new ForbiddenException(
          'We have some products in this category, you might want to delete them first.',
        );
      }
      const category = await this.categoryModel.findById(id)
      if (!category) {
        throw new NotFoundException("There is no category with this given id.")
      }
      return await this.categoryModel.findByIdAndDelete(id);
    } catch (error) {
      throw error;
    }
  }
}
