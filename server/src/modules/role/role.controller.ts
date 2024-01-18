import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleDto } from './dto/role-dto';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Auth } from '../auth/decorators/auth.decorator';

@UseGuards(RolesGuard)
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Auth()
  @Roles('ADMIN')
  @Get()
  getAll() {
    return this.roleService.getAll();
  }

  @Auth()
  @Roles('ADMIN')
  @Get(':name')
  getByName(@Param('name') name: string) {
    return this.roleService.getByName(name);
  }

  @Auth()
  @Roles('ADMIN')
  @Post()
  create(@Body() dto: RoleDto) {
    return this.roleService.create(dto);
  }

  @Auth()
  @Roles('ADMIN')
  @Delete(':name')
  delete(@Param('name') name: string) {
    return this.roleService.delete(name);
  }
}
