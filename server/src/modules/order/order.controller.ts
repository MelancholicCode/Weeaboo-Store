import {
  Controller,
  Delete,
  ForbiddenException,
  Get,
  NotFoundException,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { Auth } from '../auth/decorators/auth.decorator';
import { CurrentUser } from '../auth/decorators/user.decorator';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Auth()
  @Get()
  getAll(@CurrentUser('id') userId: number) {
    return this.orderService.getAll(userId);
  }

  @Auth()
  @Get(':id')
  getOneWithItems(@CurrentUser('id') userId: number, @Param('id') id: string) {
    return this.orderService.getOneWithItems(userId, +id);
  }

  @Auth()
  @Post()
  create(
    @CurrentUser('id') userId: number,
    @CurrentUser('isActivated') isActivated: boolean,
    @CurrentUser('address') address: string,
  ) {
    if (!isActivated) {
      throw new ForbiddenException('The account is not activated');
    }

    return this.orderService.create(+userId, address);
  }

  @Auth()
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Delete(':id')
  delete(
    @CurrentUser('isActivated') isActivated: boolean,
    @Param('id') id: string,
  ) {
    if (!isActivated) {
      throw new ForbiddenException('The account is not activated');
    }

    try {
      return this.orderService.delete(+id);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
