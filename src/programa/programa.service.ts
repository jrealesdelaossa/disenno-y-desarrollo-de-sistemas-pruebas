import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Programa } from './schema/programa.schema';
import { Model } from 'mongoose';
import { ActualizarProgramaDto, ProgramaDto } from './dto/programa.dto';
import { competenciaDto } from './dto/competencia.dto';
import { resultadoDto } from './dto/resultado.dto';

@Injectable()
export class ProgramaService {
  constructor(
    @InjectModel(Programa.name) private ProgramaModel: Model<Programa>,
  ) {}

  /* Todos los metodos de obtener */
  async obtenerTodo(): Promise<NotFoundException | Programa[]> {
    return await this.ProgramaModel.find().then((data) => {
      if (data) {
        return data;
      } else {
        return new NotFoundException(
          'No se encontraron documentos en programas',
        );
      }
    });
  }
  async obtenerProgramaId(id: string): Promise<NotFoundException | Programa> {
    return await this.ProgramaModel.findById(id).then((data) => {
      if (data) {
        return data;
      } else {
        return new NotFoundException('No hay programas con ese id');
      }
    });
  }

  async obtenerCompetencias(id: string) {
    return await this.ProgramaModel.findById(id).then((programa) => {
      return programa.competencia;
    });
  }

  async obtenerResultados(id: string, codigo: string) {
    return await this.ProgramaModel.findById(id).then((programa) => {
      if (programa) {
        const posicion = this.verificarCompetenciaExistente(codigo, programa);
        if (posicion == -1) {
          return new NotFoundException(`No se encontro el codigo ${codigo}`);
        }
        return programa.competencia[posicion].resultado;
      }
      return new NotFoundException(`No se encontro el programa con id: ${id}`);
    });
  }

  /* Todos los metodos de crear */
  async crearPrograma(
    ProgramaDto: ProgramaDto,
  ): Promise<NotFoundException | Programa> {
    let existe: any = await this.ProgramaModel.exists({
      codigo: ProgramaDto.codigo,
    });
    existe === null ? (existe = false) : (existe = true);
    if (existe) {
      return new NotFoundException(
        `Ya existe un programa con el codigo ${ProgramaDto.codigo}`,
      );
    }
    const Programa = new this.ProgramaModel(ProgramaDto);
    return await Programa.save();
  }
  async crearCompetencia(
    competencia: competenciaDto,
    id: string,
  ): Promise<Programa | NotFoundException> {
    return await this.ProgramaModel.findById(id).then((miprograma) => {
      const existe = this.verificarCompetenciaExistente(
        competencia.codigo,
        miprograma,
      );
      if (miprograma) {
        if (existe !== -1) {
          return new NotFoundException('La Competencia ya existe');
        }

        miprograma.competencia.push(competencia);
        return this.actualizarDocumento(miprograma);
      }
      return new NotFoundException(
        'No se encontro el programa asociado a la competencia',
      );
    });
  }
  async crearResultado(id: string, codigo: string, resultado: resultadoDto) {
    return await this.ProgramaModel.findById(id).then((programa) => {
      if (programa) {
        const posicion = this.verificarCompetenciaExistente(codigo, programa);
        if (posicion == -1) {
          return new NotFoundException(`No se encontro el codigo ${codigo}`);
        }
        programa.competencia[posicion].resultado.push(resultado);
        return this.actualizarDocumento(programa);
      }

      return new NotFoundException(`No se encontro el programa con id: ${id}`);
    });
  }

  /* Todos los metodos de borrar */

  async borrarPrograma(id: string) {
    return await this.ProgramaModel.findByIdAndRemove(id).then((data) => {
      if (data) {
        return data;
      } else {
        return new NotFoundException(
          `No se encontro el documento con id:${id} en programas`,
        );
      }
    });
  }
  async borrarCompetencia(id: string, codigo: string) {
    return await this.ProgramaModel.findById(id).then((miprograma) => {
      const competenciaEliminda = miprograma.competencia.filter(
        (compencia) => compencia.codigo !== codigo,
      );
      if (
        miprograma.competencia.length == competenciaEliminda.length &&
        miprograma.competencia.every(function (v, i) {
          return v === competenciaEliminda[i];
        })
      ) {
        return new NotFoundException(
          `No se encontro la competencia a eliminar con el codigo ${codigo}`,
        );
      }
      miprograma.competencia = competenciaEliminda;
      return this.actualizarDocumento(miprograma);
    });
  }
  async borrarResultado(id: string, codigo: string, posicionR: string) {
    return await this.ProgramaModel.findById(id).then((programa) => {
      if (programa) {
        const posicion = this.verificarCompetenciaExistente(codigo, programa);
        if (posicion == -1) {
          return new NotFoundException(
            `No se encontro una competencia con ese codigo ${codigo}`,
          );
        }
        const regex = /^[0-9]*$/;
        if (!regex.test(posicionR)) {
          return new NotFoundException(
            `La posicion no es un numero: ${posicionR}`,
          );
        }

        programa.competencia[posicion].resultado.splice(Number(posicionR), 1);
        return this.actualizarDocumento(programa);
      }
      return new NotFoundException(
        `No se encontro el programa con el id ${id}`,
      );
    });
  }

  /* Todos los metodos de actualizar */
  async actualizarPrograma(programa: ActualizarProgramaDto) {
    return await this.ProgramaModel.findByIdAndUpdate(
      programa.id,
      programa,
    ).then((data) => {
      return data
        ? data
        : new NotFoundException(
            `No se encontro el programa con id:${programa.id}`,
          );
    });
  }
  async actualizarCompetencia(id: string, competencia: competenciaDto) {
    return await this.ProgramaModel.findById(id).then((programa) => {
      const posicion = this.verificarCompetenciaExistente(
        competencia.codigo,
        programa,
      );
      if (posicion == -1) {
        return new NotFoundException(
          `No se encontro una competencia con ese codigo ${competencia.codigo}`,
        );
      }
      programa.competencia[posicion] = competencia;
      return this.actualizarDocumento(programa);
    });
  }
  async actualizarResultado(
    id: string,
    codigo: string,
    posicionR: string,
    resultado: resultadoDto,
  ) {
    return await this.ProgramaModel.findById(id).then((programa) => {
      const regex = /^[0-9]*$/;
      if (!regex.test(posicionR)) {
        return new NotFoundException(
          `La posicion no es un numero: ${posicionR}`,
        );
      }
      if (programa) {
        const posicion = this.verificarCompetenciaExistente(codigo, programa);
        if (posicion == -1) {
          return new NotFoundException(
            `No se encontro una competencia con el codigo ${codigo}`,
          );
        }
        programa.competencia[posicion].resultado[posicionR] = resultado;
        return this.actualizarDocumento(programa);
      }
      return new NotFoundException(
        `No se encontro el programa con el id ${id}`,
      );
    });
  }

  async actualizarDocumento(programa) {
    return await this.ProgramaModel.findByIdAndUpdate(
      programa._id,
      programa,
    ).then((data) => {
      return data
        ? data
        : new NotFoundException(
            `No se encontro el programa con id:${programa._id}`,
          );
    });
  }

  /* metodos de validacion */

  verificarCompetenciaExistente(codigo: string, programa) {
    return programa.competencia.findIndex((competenciaModel, index) => {
      if (competenciaModel.codigo == codigo) {
        return true;
      }
    });
  }
}
