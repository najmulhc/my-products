import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { CategoryService } from './category.service';

import { createCategoryDto, paramsDto } from './dto/category.dto';
import { Serialize } from 'src/interceptors/serialise.interceptor';
import { getCategoryDto } from './dto/get-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  // for getting all the categories
  @UseInterceptors(new Serialize(getCategoryDto))
  @Get()
  async findAll() {
    return this.categoryService.getAll();
  }

  // for single category by id
  @UseInterceptors(new Serialize(getCategoryDto))
  @Get(':id')
  async findById(@Param() param: paramsDto) {
    return this.categoryService.getById(param.id as string);
  }

  // for creating a new category 
  @Post()
  async create(@Body() body: createCategoryDto) {
    return await this.categoryService.create(body);
  }

  @Patch(':id')
  async update(@Param() param: paramsDto, @Body() body: createCategoryDto) {
    return await this.categoryService.updateCategory(param.id as string, body);
  }

  @Delete(':id')
  async delete(@Param() param: paramsDto) {
    return await this.categoryService.deleteCategory(param.id as string);
  }
}
