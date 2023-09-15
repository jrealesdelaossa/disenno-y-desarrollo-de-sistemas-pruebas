import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Usuarios')
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiParam({
    name: 'name',
    description: 'nombre del usuario',
    required: true,
  })
  @Get('find-one/:name')
  async findOne(@Param('name') name: string) {
    return this.usersService.findOne(name);
  }

  @ApiBody({
    type: UserDto,
  })
  @Post('create')
  async create(@Body() user: UserDto) {
    return this.usersService.createUser(user);
  }

  @ApiBody({
    type: UserDto,
  })
  @Post('/crear')
  async crear(@Body(new ValidationPipe({ transform: true })) user: UserDto) {
    return this.usersService.crearUser(user);
  }

  @Get('roles')
  async roles() {
    return this.usersService.roles();
  }
}
