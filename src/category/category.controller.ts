import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CategoryService } from './category.service';

import { createCategoryDto, paramsDto } from './dto/category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @Get()
  async getAllCategories() {
    return this.categoryService.getAll();
  }

  @Get(':id')
  async getById(@Param() param: paramsDto) {
    const { id } = param;
    return this.categoryService.getById(id as string);
  }

  @Post()
  async createCategory(@Body() body: createCategoryDto) {
    return await this.categoryService.create(body);
  }

  @Patch(':id')
  async updateById(@Param() param: paramsDto, @Body() body: createCategoryDto) {
    return await this.categoryService.updateCategory(param.id as string, body);
  }

  @Delete(':id')
  async delete(@Param() param: paramsDto) {
    return await this.categoryService.deleteCategory(param.id as string);
  }
}
