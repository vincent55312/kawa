import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../orm/prisma.service';
import { CreateOrderDto } from '../dto/order/create-order.dto';

@Injectable()
export class OrderService {
  constructor(private readonly prismaService: PrismaService) {}

  async createOrder(
    createOrderDto: CreateOrderDto,
  ): Promise<{ orderId: string }> {
    const { userId, productId, quantity } = createOrderDto;

    const userExists = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!userExists) {
      throw new BadRequestException('User not found');
    }

    const productExists = await this.prismaService.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!productExists) {
      throw new BadRequestException('Product not found');
    }

    if (productExists.stock < quantity) {
      throw new BadRequestException('Insufficient stock');
    }

    const order = await this.prismaService.order.create({
      data: {
        userId,
        productId,
        quantity,
      },
    });

    return { orderId: order.id };
  }

  async getOrder(orderId: string) {
    const order = await this.prismaService.order.findUnique({
      where: {
        id: orderId,
      },
    });

    if (!order) {
      throw new BadRequestException('Order not found');
    }

    return order;
  }

  async getAllOrders() {
    const orders = await this.prismaService.order.findMany();

    if (!orders) {
      throw new BadRequestException('No orders found');
    }

    return orders;
  }
}
