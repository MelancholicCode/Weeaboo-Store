import { Body, Controller, Param, Post } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { CreateFavoriteDto } from './dto/createFavorite.dto';

@Controller('favorite')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Post(':userId')
  create(@Param('userId') userId: string, @Body() dto: CreateFavoriteDto) {
    return this.favoriteService.create(userId, dto);
  }
}
