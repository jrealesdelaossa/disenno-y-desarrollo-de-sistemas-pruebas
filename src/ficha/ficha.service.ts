import {
  Injectable,
  NotFoundException,
  HttpStatus,
  Inject,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ficha } from './schema/ficha.schema';
import { ActualizarFichaDto, FichaDto } from './dto/ficha.dto';
import { CompetenciaService } from 'src/competencia/competencia.service';
import { ProgramaService } from 'src/programa/programa.service';
import { any } from 'joi';
import { log } from 'console';
import { GestorTService } from 'src/gestor-t/gestor-t.service';
import { TipoAmbienteService } from 'src/tipo-ambiente/tipo-ambiente.service';
import { TipoAmbiente } from 'src/tipo-ambiente/schemas/tipo-ambiente.schema';

@Injectable()
export class FichaService {
  constructor(
    @InjectModel(Ficha.name) private fichaModel: Model<Ficha>,
    @Inject(CompetenciaService) readonly competenciaService: CompetenciaService,
    @Inject(ProgramaService) readonly programaService: ProgramaService,
    @Inject(GestorTService) readonly gestorTService: GestorTService,
  ) {}

  async obtenerTodo() {
    return await this.fichaModel
      .find()
      .populate({
        path: 'sede',
          populate:{
            path: 'centro',
            populate:{
              path: 'regional'
            }
          }
        })
      .populate({
        path: 'ambiente',      
        populate: [{
          path: 'bloque',
          populate:{
            path: 'sede',
            populate: {
              path: 'centro',
              populate: {
                path: 'regional'
              }
            }
          }
        },{
          path: 'tipo'
        },{
          path: 'sede',
          populate:{
            path: 'centro',
            populate:{
              path: 'regional'
            }
          }
        }]
      })
      /*.populate('ambiente')*/
      .populate('programa')
      .populate({
        path: 'instructor',
        populate: [{
          path: 'programas'
        }, {
          path: 'sede',
          populate:{
            path: 'centro',
            populate:{
              path: 'regional'
            }
          }
        }]
      });
  }

  async obtenerFicha(id: string) {
    return await this.fichaModel
      .findById(id)
      .populate('ambiente')
      .populate('programa')
      .populate('instructor')
      .then((ficha) => {
        return ficha
          ? ficha
          : new NotFoundException(`No se encontro la ficha con id:${id}`);
      });
  }

  async crearFicha(fichaDto: FichaDto) {
    let gestor;
    return await this.fichaModel.create(fichaDto).then((fichaCreada) => {
      return this.competenciaService
        .obtenerCompetenciasPorPrograma(fichaDto.programa)
        .then((competenciasM: any) => {
          return this.programaService
            .obtenerDuracion(fichaDto.programa)
            .then((duracion) => {
              gestor = {
                ficha: fichaCreada._id,
                duracion: duracion,
                acumulado: 0,
                competencias: [],
              };
              competenciasM[0].competencias.map((competencias: any) => {
                competencias.acumulado = 0;
                competencias.resultados.map((resultado) => {
                  resultado.acumulado = 0;
                });
                gestor.competencias.push(competencias);
              });
              this.gestorTService.crearGestor(gestor);
              return fichaCreada;
            });
        });
    });
  }

  async actualizarFicha(
    ficha: ActualizarFichaDto,
  ): Promise<NotFoundException | Ficha> {
    console.log(ficha.id);
    return await this.fichaModel
      .findByIdAndUpdate(ficha.id, ficha)
      .then((ficha) => {
        return ficha
          ? ficha
          : new NotFoundException(
              `No se pudo actualizar la ficha con id:${ficha.id}`,
            );
      });
  }

  async eliminarFicha(id: string) {
    return await this.fichaModel.findByIdAndDelete(id).then((ficha) => {
      return ficha
        ? ficha
        : new NotFoundException(`No se encontró la ficha con id:${id}`);
    });
  }

  async obtenerFichasPorPrograma(id: string): Promise<Ficha[] | []> {
    return await this.fichaModel
      .find({ programa: id })
      .populate('sede')
      .populate('ambiente')
      .populate('programa')
      .populate('instructor');
  }
}
