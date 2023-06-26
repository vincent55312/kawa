import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { CreateOrderDto } from '../dto/order/create-order.dto';
import { GetOrderDto } from '../dto/order/get-order.dto';
import { OrderService } from '../services/order.service';
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('/create')
  async createOrder(
    @Body() createOrderDto: CreateOrderDto,
  ): Promise<{ orderId: string }> {
    return await this.orderService.createOrder(createOrderDto);
  }

  @Get('/:id')
  async getOrder(@Param() getOrderDto: GetOrderDto) {
    return await this.orderService.getOrder(getOrderDto.id);
  }

  @Get('/')
  async getAllOrders() {
    return await this.orderService.getAllOrders();
  }
}
