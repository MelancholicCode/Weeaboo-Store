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
import { CategoryService } from './category.service';
import { CategoryDto } from './dto/category.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { Auth } from '../auth/decorators/auth.decorator';
import { CurrentUser } from '../auth/decorators/user.decorator';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  getAll() {
    return this.categoryService.getAll();
  }

  @Get(':slug')
  getOne(@Param('slug') slug: string) {
    return this.categoryService.getOne(slug);
  }

  @Auth()
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post()
  create(
    @CurrentUser('isActivated') isActivated: boolean,
    @Body() dto: CategoryDto,
  ) {
    if (!isActivated) {
      throw new ForbiddenException('The account is not activated');
    }

    return this.categoryService.create(dto);
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

    return this.categoryService.delete(+id);
  }
}
