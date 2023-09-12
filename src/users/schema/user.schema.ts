import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ unique: true })
  name: string;

  @Prop({ unique: true })
  password: string;

  @Prop({ default: ['userBasic'] })
  roles: string[];
}
export const UserSchema = SchemaFactory.createForClass(User);
