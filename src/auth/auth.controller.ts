import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from 'src/users/dto/user.dto';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() sigInDto: UserDto) {
    return this.authService.signIn(sigInDto);
  }

  @Get('/logueado')
  @UseGuards(JwtAuthGuard)
  logueado() {
    return {
      message: 'Bienvenido',
      status: 'Logueado',
    };
  }
}
