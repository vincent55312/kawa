import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../orm/prisma.service';
import { CreateProductDto } from '../dto/product/create-product.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ProductService {
  constructor(private readonly prismaService: PrismaService) {}

  async createProduct(
    createProductDto: CreateProductDto,
  ): Promise<{ productId: string }> {
    const productExists = await this.prismaService.product.findFirst({
      where: {
        name: createProductDto.name,
      },
    });

    if (productExists) {
      throw new BadRequestException(
        'Product with the same name already exists',
      );
    }

    const product = await this.prismaService.product.create({
      data: {
        id: uuidv4(),
        name: createProductDto.name,
        description: createProductDto.description,
        price: createProductDto.price,
        stock: createProductDto.stock,
        photo: createProductDto.photo,
      },
    });

    return { productId: product.id };
  }

  async getProduct(productId: string) {
    const product = await this.prismaService.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product) {
      throw new BadRequestException('Product not found');
    }

    return product;
  }

  async getAllProducts() {
    const product = await this.prismaService.product.findMany();

    if (!product) {
      throw new BadRequestException('Product not found');
    }

    return product;
  }
}
