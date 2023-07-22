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
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Instructor')
@Controller('instructor')
export class InstructorController {
  constructor(private readonly instructorService: InstructorService) {}

  @Get()
  async obtenerInstructores() {
    return await this.instructorService.obtenerInstructores();
  }

  @Get('/programa/:id')
  async obtenerInstructoresPorPrograma(@Param('id') id: string) {
    return await this.instructorService.obtenerInstructoresPorPrograma(id);
  }

  @ApiParam({
    name: 'id',
  })
  @Get('/:id')
  async obtenerInstructor(@Param('id') id: string) {
    return await this.instructorService.obtenerInstructor(id);
  }

  @ApiBody({
    type: InstructorDto,
  })
  @Post('/crear')
  async crearInstructor(@Body() instructor: InstructorDto) {
    return await this.instructorService.crearInstructor(instructor);
  }

  @ApiBody({
    type: ActualizarInstructorDto,
  })
  @Put('/actualizar')
  async actualizarInstructor(@Body() instructor: ActualizarInstructorDto) {
    return await this.instructorService.actualizarInstructor(instructor);
  }

  @ApiParam({
    name: 'Id',
    description: 'Id del instructor a eliminar',
  })
  @Delete('/eliminar/:id')
  async eliminarInstructor(@Param('id') id: string) {
    return await this.instructorService.eliminarInstructor(id);
  }
}
