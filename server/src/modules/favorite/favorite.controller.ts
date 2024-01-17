import {
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { Auth } from '../auth/decorators/auth.decorator';
import { CurrentUser } from '../auth/decorators/user.decorator';

@Controller('favorite')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Auth()
  @Get()
  getAll(@CurrentUser('id') userId: number) {
    return this.favoriteService.getAll(userId);
  }

  @Auth()
  @Post(':productId')
  create(
    @CurrentUser('isActivated') isActivated: boolean,
    @CurrentUser('id') userId: number,
    @Param('productId') productId: string,
  ) {
    if (!isActivated) {
      throw new ForbiddenException('The account is not activated');
    }

    return this.favoriteService.create(userId, +productId);
  }

  @Auth()
  @Delete(':id')
  delete(@CurrentUser('id') userId: number, @Param('id') id: string) {
    return this.favoriteService.delete(userId, +id);
  }
}
