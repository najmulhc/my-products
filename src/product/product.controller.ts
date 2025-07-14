import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { Serialize } from 'src/interceptors/serialise.interceptor';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductService } from './product.service';

import { ApiQuery } from '@nestjs/swagger';
import { paramsDto } from 'src/category/dto/category.dto';
import { getProductDto } from './dto/get-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @UseInterceptors(new Serialize(getProductDto))
  @Get()
  @ApiQuery({
    name: 'category',
    required: false,
  })
  @ApiQuery({
    name: 'search',
    required: false,
  })
  findAll(
    @Query('category') category: string,
    @Query('search') search: string,
  ) {
    return this.productService.findAll(category, search);
  }

  @UseInterceptors(new Serialize(getProductDto))
  @Get(':id')
  async findOne(@Param() param: paramsDto) {
    return await this.productService.findOne(param.id);
  }

  @Patch(':id')
  update(
    @Param() param: paramsDto,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productService.update(param.id, updateProductDto);
  }
  // delete api
  @Delete(':id')
  delete(@Param() param: paramsDto) {
    return this.productService.delete(param.id);
  }
}
