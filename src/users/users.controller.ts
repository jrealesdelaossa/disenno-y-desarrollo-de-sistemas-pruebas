import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('find-one/:name')
  async findOne(@Param('name') name: string) {
    return this.usersService.findOne(name);
  }

  @Post('create')
  async create(@Body() user: UserDto) {
    return this.usersService.createUser(user);
  }
}
