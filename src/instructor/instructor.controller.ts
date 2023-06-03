import { Body, Controller, Post } from '@nestjs/common';
import { InstructorService } from './instructor.service';
import { InstructorDto } from './dto/instructor.dto';

@Controller('instructor')
export class InstructorController {
  constructor(private readonly instructor: InstructorService) {}

  @Post('/crear')
  async crearInstructor(@Body() instructor: InstructorDto) {
    return await this.instructor.crearInstructor(instructor);
  }
}
