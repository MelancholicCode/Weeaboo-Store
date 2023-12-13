import { Controller, Delete, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { Auth } from '../auth/decorators/auth.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Auth()
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Get()
  getAll() {
    return this.userService.getAll();
  }

  @Auth()
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Get(':email')
  getOne(@Param('email') email: string) {
    return this.userService.getOneByEmail(email);
  }

  @Auth()
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Delete(':email')
  delete(@Param('email') email: string) {
    return this.userService.delete(email);
  }
}
