import {
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { Auth } from '../auth/decorators/auth.decorator';
import { CurrentUser } from '../auth/decorators/user.decorator';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Auth()
  @Get()
  getAllItems(@CurrentUser('id') userId: number) {
    return this.cartService.getAllItems(userId);
  }

  @Auth()
  @Post('productId')
  createItem(
    @CurrentUser('id') userId: number,
    @Param(':productId') productId: string,
  ) {
    return this.cartService.createItem(userId, +productId);
  }

  @Auth()
  @Delete(':id')
  deleteItem(@CurrentUser('id') userId: number, @Param('id') id: string) {
    try {
      return this.cartService.deleteItem(userId, +id);
    } catch (error) {
      throw new NotFoundException('Cart item not found');
    }
  }
}
