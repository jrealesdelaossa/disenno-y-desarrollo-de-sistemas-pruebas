import { BadRequestException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { UserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findOne(name: string) {
    return this.userModel.findOne({ name });
  }

  async findOneAuth(email: string) {
    return await this.userModel.findOne({ email: email });
  }
  async crearUser(user: UserDto) {
    const existeCorreo = await this.validarCorreo(user.correo);
    if (existeCorreo) {
      return new BadRequestException(
        `El usuario con el correo ${user.correo} ya existe`,
      );
    }
    const userBd = {
      ...user,
      password: bcrypt.hashSync(user.password, 10),
    };

    return await this.userModel.create(userBd);
  }
  async roles() {
    return ['Instructor', 'Administrator', 'Coordinador'];
  }

  async validarCorreo(email: string): Promise<boolean> {
    const user = await this.userModel.findOne({ correo: email });
    if (user) {
      return true;
    }
    return false;
  }
}
