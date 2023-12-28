import { Controller, Delete, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { Auth } from '../auth/decorators/auth.decorator';

@Auth()
@Roles('ADMIN')
@UseGuards(RolesGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAll() {
    return this.userService.getAll();
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
