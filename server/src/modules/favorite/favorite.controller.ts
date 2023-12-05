import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { CreateFavoriteDto } from './dto/createFavorite.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('favorite')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @UseGuards(JwtAuthGuard)
  @Post(':userId')
  create(@Param('userId') userId: string, @Body() dto: CreateFavoriteDto) {
    return this.favoriteService.create(userId, dto);
  }
}
