import {
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { OrderService } from './order.service';

import { Auth } from '../auth/decorators/auth.decorator';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Auth()
  @Get(':orderId')
  getAllItems(@Param('orderId') orderId: string) {
    return this.orderService.getAllItems(orderId);
  }

  @Auth()
  @Post(':userId')
  create(@Param('userId') userId: string) {
    return this.orderService.create(userId);
  }

  @Auth()
  @Delete(':id')
  delete(@Param('id') id: string) {
    try {
      return this.orderService.delete(id);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
