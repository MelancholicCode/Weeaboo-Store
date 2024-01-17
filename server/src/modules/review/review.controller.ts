import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { CurrentUser } from '../auth/decorators/user.decorator';
import { ReviewDto } from './dto/review.dto';
import { Auth } from '../auth/decorators/auth.decorator';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Auth()
  @Get()
  getMy(@CurrentUser('id') userId: number) {
    return this.reviewService.getMy(userId);
  }

  @Get(':productId')
  getAll(@Param('productId') productId: string) {
    return this.reviewService.getAll(+productId);
  }

  @Auth()
  @Post(':productId')
  create(
    @CurrentUser('id') userId: number,
    @Param('productId') productId: string,
    @Body() dto: ReviewDto,
  ) {
    return this.reviewService.create(userId, +productId, dto);
  }

  @Auth()
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Delete(':reviewId')
  delete(
    @CurrentUser('isActivated') isActivated: boolean,
    @Param('reviewId') id: string,
  ) {
    if (!isActivated) {
      throw new ForbiddenException('The account is not activated');
    }

    return this.reviewService.delete(+id);
  }
}
