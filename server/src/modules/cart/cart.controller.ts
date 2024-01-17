import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { Auth } from '../auth/decorators/auth.decorator';
import { CurrentUser } from '../auth/decorators/user.decorator';
import { ChangeCartItemQuantityDto } from './dto/change-cart-item-quantity.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Auth()
  @Get()
  getAllItems(@CurrentUser('id') userId: number) {
    return this.cartService.getAllItems(userId);
  }

  @Auth()
  @Post(':productId')
  createItem(
    @CurrentUser('isActivated') isActivated: boolean,
    @CurrentUser('id') userId: number,
    @Param('productId') productId: string,
  ) {
    if (!isActivated) {
      throw new ForbiddenException('The account is not activated');
    }

    return this.cartService.createItem(userId, +productId);
  }

  @Auth()
  @Patch(':id')
  changeQuantity(
    @CurrentUser('id') userId: number,
    @Param('id') id: string,
    @Body() dto: ChangeCartItemQuantityDto,
  ) {
    return this.cartService.changeQuantity(userId, +id, dto);
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
