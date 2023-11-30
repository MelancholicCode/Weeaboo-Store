import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleDto } from './role.dto';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}
  @Get()
  getAll() {
    return this.roleService.getAll();
  }

  @Get(':name')
  getByName(@Param('name') name: string) {
    return this.roleService.getByName(name);
  }

  @Post()
  create(@Body() dto: RoleDto) {
    return this.roleService.create(dto);
  }
}
