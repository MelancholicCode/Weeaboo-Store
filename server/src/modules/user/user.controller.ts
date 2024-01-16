import {
  Controller,
  Delete,
  Get,
  Param,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { Auth } from '../auth/decorators/auth.decorator';
import { Response } from 'express';

@Auth()
@Roles('ADMIN')
@UseGuards(RolesGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getMany(
    @Query('count') count: string,
    @Query('offset') offset: string,
    @Res() response: Response,
  ) {
    const users = await this.userService.getMany(count, offset, response);

    response.json(users);
  }

  @Get(':email')
  getOne(@Param('email') email: string) {
    return this.userService.getOneByEmail(email);
  }

  @Delete(':email')
  delete(@Param('email') email: string) {
    return this.userService.delete(email);
  }
}
