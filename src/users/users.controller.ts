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
import { ValidateObjectidPipe } from 'src/common/validate-objectid/validate-objectid.pipe';

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
  @Post('/crear')
  async crear(@Body(new ValidationPipe({ transform: true })) user: UserDto) {
    return this.usersService.crearUser(user);
  }

  @Get('roles')
  async roles() {
    return this.usersService.roles();
  }

  @Get('programa/centro/:programa/:centro')
  async instructorByProgramaByCentro(
    @Param('programa', ValidateObjectidPipe) programa: string,
    @Param('centro', ValidateObjectidPipe) centro: string,
  ) {
    return await this.usersService.instructorByProgramaByCentro(
      programa,
      centro,
    );
  }
}
