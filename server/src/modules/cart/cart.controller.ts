import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CartItemDto } from './dto/cart-item.dto';
import { Auth } from '../auth/decorators/auth.decorator';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Auth()
  @Get(':cartId')
  getAllItems(@Param('cartId') cartId: string) {
    return this.cartService.getAllItems(cartId);
  }

  @Auth()
  @Post(':cartId')
  createItem(@Param('cartId') cartId: string, @Body() dto: CartItemDto) {
    return this.cartService.createItem(cartId, dto);
  }

  @Auth()
  @Delete(':id')
  deleteItem(@Param('id') id: string) {
    try {
      return this.cartService.deleteItem(id);
    } catch (error) {
      throw new NotFoundException('Cart item not found');
    }
  }
}
