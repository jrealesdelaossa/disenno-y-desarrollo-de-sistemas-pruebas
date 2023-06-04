import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { InstructorService } from './instructor.service';
import { ActualizarInstructorDto, InstructorDto } from './dto/instructor.dto';

@Controller('instructor')
export class InstructorController {
  constructor(private readonly instructorService: InstructorService) {}

  @Get()
  async obtenerInstructores() {
    return await this.instructorService.obtenerInstructores();
  }

  @Get('/:id')
  async obtenerInstructor(@Param('id') id: string) {
    return await this.instructorService.obtenerInstructor(id);
  }

  @Post('/crear')
  async crearInstructor(@Body() instructor: InstructorDto) {
    return await this.instructorService.crearInstructor(instructor);
  }

  @Put('/actualizar')
  async actualizarInstructor(@Body() instructor: ActualizarInstructorDto) {
    return await this.instructorService.actualizarInstructor(instructor);
  }

  @Delete('/eliminar/:id')
  async eliminarInstructor(@Param('id') id: string) {
    return await this.instructorService.eliminarInstructor(id);
  }
}
