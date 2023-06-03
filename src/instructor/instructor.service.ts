import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Instructor } from './schema/instructor.schema';
import { InstructorDto } from './dto/instructor.dto';

@Injectable()
export class InstructorService {
  constructor(
    @InjectModel(Instructor.name) private instructorModel: Model<Instructor>, // TODO: Injectar el servicio de Jornada
  ) {}

  async crearInstructor(instructor: InstructorDto) {
    return await this.instructorModel.create(instructor);
  }
}
