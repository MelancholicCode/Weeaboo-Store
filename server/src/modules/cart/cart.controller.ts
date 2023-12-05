import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartItemDto } from './dto/createCartItem.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':cartId')
  getAllItems(@Param('cartId') cartId: string) {
    return this.cartService.getAllItems(cartId);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':cartId')
  createItem(@Param('cartId') cartId: string, @Body() dto: CreateCartItemDto) {
    return this.cartService.createItem(cartId, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteItem(@Param('id') id: string) {
    try {
      return this.cartService.deleteItem(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
}
