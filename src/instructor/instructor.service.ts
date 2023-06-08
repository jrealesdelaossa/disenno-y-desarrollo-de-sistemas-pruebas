import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Instructor } from './schema/instructor.schema';
import { ActualizarInstructorDto, InstructorDto } from './dto/instructor.dto';
import { TipoDeVinculacionService } from '../tipo-de-vinculacion/tipo-de-vinculacion.service';

@Injectable()
export class InstructorService {
  constructor(
    @InjectModel(Instructor.name) private instructorModel: Model<Instructor>, // TODO: Injectar el servicio de Jornada
    @Inject(TipoDeVinculacionService)
    private tipoVinculacionService: TipoDeVinculacionService,
  ) {}

  async obtenerInstructores(): Promise<NotFoundException | Instructor[]> {
    const instructor = await this.instructorModel.find().populate('jornada');
    if (instructor) {
      console.log(
        await this.tipoVinculacionService.obtenerTipoVinculacion(
          instructor[0].contrato.tipoVinculacion,
        ),
      );
      return instructor;
    }

    return new NotFoundException('No se encontraron instructores');
  }
  async obtenerInstructor(id: string) {
    return (await this.instructorModel.findById(id))
      .populate('jornada')
      .then((instructor) => {
        return instructor
          ? instructor
          : new NotFoundException(`No se encontro el instructor con id: ${id}`);
      });
  }

  async crearInstructor(
    instructor: InstructorDto,
  ): Promise<NotFoundException | Instructor> {
    return await this.instructorModel.create(instructor).then((instructor) => {
      return instructor
        ? instructor
        : new NotFoundException(`No se puede crear el instructor`);
    });
  }

  async actualizarInstructor(
    instructor: ActualizarInstructorDto,
  ): Promise<NotFoundException | Instructor> {
    return await this.instructorModel
      .findByIdAndUpdate(instructor.id, instructor)
      .then((instructor) => {
        return instructor
          ? instructor
          : new NotFoundException(
              `No se encontro el instructor con id: ${instructor.id}`,
            );
      });
  }

  async eliminarInstructor(id: string) {
    return await this.instructorModel
      .findByIdAndDelete(id)
      .then((instructor) => {
        return instructor
          ? instructor
          : new NotFoundException(`No se encontro el instructor con id: ${id}`);
      });
  }
}
