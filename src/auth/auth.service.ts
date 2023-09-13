import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UserDto } from 'src/users/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(JwtService) private jwtService: JwtService,
    @Inject(JwtStrategy) private jwtStrategy: JwtStrategy,
  ) {}

  async signIn(userSignIn: UserDto): Promise<any> {
    return await this.jwtStrategy.validate({
      username: userSignIn.name,
      password: userSignIn.password,
    });
  }
}
