import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findOne(name: string) {
    return this.userModel.findOne({ name });
  }

  async createUser(user: UserDto) {
    return await this.userModel.create(user);
  }

  async findOneAuth(email: string) {
    return await this.userModel.findOne({ email: email });
  }
  async crearUser(user: UserDto) {
    return await this.userModel.create(user);
  }
  async roles() {
    return ['Instructor', 'Administrator', 'Coordinador'];
  }
}
