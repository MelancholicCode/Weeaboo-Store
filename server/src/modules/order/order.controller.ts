import {
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':orderId')
  getAllItems(@Param('orderId') orderId: string) {
    return this.orderService.getAllItems(orderId);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':userId')
  create(@Param('userId') userId: string) {
    return this.orderService.create(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id') id: string) {
    try {
      return this.orderService.delete(id);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
