import { Body, Controller, Param, Post } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { FavoriteDto } from './dto/favorite.dto';
import { Auth } from '../auth/decorators/auth.decorator';

@Controller('favorite')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Auth()
  @Post(':userId')
  create(@Param('userId') userId: string, @Body() dto: FavoriteDto) {
    return this.favoriteService.create(userId, dto);
  }
}
