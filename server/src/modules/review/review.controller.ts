import {
  Controller,
  Delete,
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

@Controller()
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get(':productId')
  getAll(@Param('productId') productId: string) {
    return this.reviewService.getAll(+productId);
  }

  @Post(':productId')
  create(
    @CurrentUser('id') userId: number,
    @Param('productId') productId: string,
    dto: ReviewDto,
  ) {
    return this.reviewService.create(userId, +productId, dto);
  }

  @Auth()
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Delete(':reviewId')
  delete(@Param('reviewId') id: string) {
    return this.reviewService.delete(+id);
  }
}
