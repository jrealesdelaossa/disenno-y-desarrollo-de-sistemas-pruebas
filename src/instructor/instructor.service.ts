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
    return await this.instructorModel.find().then((instructor) => {
      return instructor
        ? instructor
        : new NotFoundException('No se encontraron instructores');
    });
  }
  async obtenerInstructor(id: string) {
    return await this.instructorModel.findById(id).then((instructor) => {
      return instructor
        ? instructor
        : new NotFoundException(`No se encontro el instructor con id: ${id}`);
    });
  }

  async crearInstructor(
    instructor: InstructorDto,
  ): Promise<NotFoundException | Instructor> {
    if (
      !this.existeDocYNumContrato(
        instructor.documento,
        instructor.contrato.numero,
      )
    ) {
      return await this.instructorModel
        .create(instructor)
        .then((instructor) => {
          return instructor
            ? instructor
            : new NotFoundException(`No se pudo crear el instructor`);
        });
    }
    return new NotFoundException(
      `El instructor con documento: ${instructor.documento} o el número de contrato ${instructor.contrato.numero} ya existen, no se puede crear el instructor`,
    );
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

  async existeDocYNumContrato(
    documento: string,
    numContrato: string,
  ): Promise<boolean> {
    return await this.instructorModel
      .exists({
        $or: [{ documento: documento }, { 'contrato.numero': numContrato }],
      })
      .then((instructor) => {
        return instructor ? true : false;
      });
  }
}
