import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ProductService } from '../services/product.service';
import { CreateProductDto } from '../dto/product/create-product.dto';
import { GetProductDto } from '../dto/product/get-product.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('/create')
  async createProduct(
    @Body() createProductDto: CreateProductDto,
  ): Promise<{ productId: string }> {
    return await this.productService.createProduct(createProductDto);
  }

  @Get('/:id')
  async getProduct(@Param() getProductDto: GetProductDto) {
    return await this.productService.getProduct(getProductDto.id);
  }


  @Get('/')
  async getAllProducts() {
    return await this.productService.getAllProducts();
  }
}
