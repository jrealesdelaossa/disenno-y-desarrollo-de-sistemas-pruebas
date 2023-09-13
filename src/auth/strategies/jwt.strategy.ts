import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/users/schema/user.schema';
import { JwtPayload } from '../interfaces/jwt-strategy.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @Inject(JwtService) private jwtService: JwtService,
  ) {
    super({
      secretOrKey:
        'DO NOT USE THIS VALUE. INSTEAD, CREATE A COMPLEX SECRET AND KEEP IT SAFE OUTSIDE OF THE SOURCE CODE.',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(
    payload: JwtPayload,
  ): Promise<User | { access_token: string }> {
    const { username } = payload;
    const userBd = await this.userModel.findOne({ name: username });
    if (!userBd) {
      throw new UnauthorizedException('No Existe este');
    }

    const payloadZ = { sub: userBd.id, username: userBd.name };
    return {
      name: username,
      access_token: await this.jwtService.signAsync(payloadZ),
    };
  }
}
