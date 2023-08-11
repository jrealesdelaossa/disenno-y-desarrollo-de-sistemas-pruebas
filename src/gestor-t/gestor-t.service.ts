import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { GestorTDto } from './dto/gestor-t.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Gestor } from './schema/gestor-t.schema';
import { Model } from 'mongoose';
import { EventosReporteDto } from './dto/eventos.reporte.dto';
import { resolve } from 'path';
import { RestarTiempoFichaDto } from './dto/restarTiempoFicha.dto';

@Injectable()
export class GestorTService {
  constructor(@InjectModel(Gestor.name) private gestorTModel: Model<Gestor>) {}
  async crearGestor(gestorTDto: GestorTDto) {
    const existeGestor = await this.existeGestor(gestorTDto.ficha);
    if (!existeGestor) {
      return await this.gestorTModel.create(gestorTDto);
    }
    return new ConflictException(
      `El gestor de tiempo para la ficha: ${gestorTDto.ficha} ya existe`,
    );
  }

  async obtenerTodo() {
    return await this.gestorTModel.find();
  }

  async obtenerGestor(id_ficha: string): Promise<any> {
    return new Promise((resolve) => {
      resolve(
        this.gestorTModel.find({ ficha: id_ficha }).then((gestor) => {
          return gestor
            ? gestor
            : new NotFoundException(
                `No se encontró un gestor de tiempo para la ficha: ${id_ficha}`,
              );
        }),
      );
    });
  }
  async obtenerGestores(fichas): Promise<Gestor[] | []> {
    return await this.gestorTModel.find({ $or: fichas }).then((gestores) => {
      return gestores ? gestores : [];
    });
  }

  async reporteTiempos(
    reporteFichaDto: EventosReporteDto,
  ): Promise<object[] | ConflictException | any> {
    // eslint-disable-next-line prefer-const
    let msg: any[] = [];
    if (reporteFichaDto.eventos.length > 0) {
      const fichas = reporteFichaDto.eventos.map((evento) => {
        return {
          ficha: evento.ficha.ficha,
        };
      });

      const gestores = await this.obtenerGestores(fichas);
      if (gestores.length > 0) {
        await new Promise(async (resolve) => {
          return await reporteFichaDto.eventos.map((evento, index) => {
            new Promise(async (resolve) => {
              const gestorFichaIndex = await gestores.findIndex(
                (gestor: any) => gestor.ficha == evento.ficha.ficha,
              );
              if (gestorFichaIndex != -1) {
                const gestor = gestores[gestorFichaIndex];

                const competengiaGestor: any = gestor.competencias;
                //Buscamos el indice de la competencia que coincide con el código
                const compIndex = await competengiaGestor.findIndex(
                  (competencia) =>
                    competencia.codigo == evento.competencia.codigo,
                );
                //Si es diferente de -1 es porque existe esa competencia
                if (compIndex != -1) {
                  const duracionComp = competengiaGestor[compIndex].duracion;
                  const acumuladoCom = competengiaGestor[compIndex].acumulado;
                  const horasEnv = evento.horas;
                  //Si las horas enviadas + el acumulado no se pasa la duración de la competencia
                  if (acumuladoCom + horasEnv <= duracionComp) {
                    const resuIndex = await competengiaGestor[
                      compIndex
                    ].resultados.findIndex(
                      (resultado) => resultado.orden == evento.resultado.orden,
                    );
                    if (resuIndex != -1) {
                      const duracionResu =
                        competengiaGestor[compIndex].resultados[resuIndex]
                          .duracion;
                      const acumuladoResu =
                        competengiaGestor[compIndex].resultados[resuIndex]
                          .acumulado;
                      //Si las horas enviadas + el acumulado no se pasa la duración del resultado de aprendizaje
                      if (acumuladoResu + horasEnv <= duracionResu) {
                        //Le sumo las horas enviadas al acumulado del resultado de aprendizaje
                        competengiaGestor[compIndex].resultados[
                          resuIndex
                        ].acumulado += horasEnv;
                        //Le sumo las horas enviadas al acumulado de la competencia
                        competengiaGestor[compIndex].acumulado += horasEnv;
                        //Armo el objeto a guardar
                        const datosGuardar = {
                          acumulado: gestor.acumulado + horasEnv,
                          competencias: competengiaGestor,
                        };
                        const resBD = await this.gestorTModel
                          .findOneAndUpdate(
                            { ficha: evento.ficha.ficha },
                            datosGuardar,
                          )
                          .then((gestor) => {
                            return gestor
                              ? {
                                  actualizado: true,
                                  indexEvento: index,
                                  codigoCompetencia: evento.competencia.codigo,
                                  ordenResultado: evento.resultado.orden,
                                  horasAgregadas: horasEnv,
                                  motivo: `Gestor de tiempo de la ficha: ${evento.ficha.ficha} actualizado`,
                                }
                              : {
                                  actualizado: false,
                                  indexEvento: index,
                                  codigoCompetencia: evento.competencia.codigo,
                                  ordenResultado: evento.resultado.orden,
                                  horasAgregadas: horasEnv,
                                  motivo: `No se pudo actualizar el gestor de tiempo de la ficha: ${evento.ficha.ficha}`,
                                  error: gestor,
                                };
                          });
                        resolve(resBD);
                        return resBD;
                      } else {
                        resolve({
                          actualizado: false,
                          indexEvento: index,
                          codigoCompetencia: evento.competencia.codigo,
                          ordenResultado: evento.resultado.orden,
                          motivo: `El resultado de aprendizaje con orden: ${evento.resultado.orden} de la competencia con código: ${evento.competencia.codigo} supera su duración`,
                        });
                      }
                    } else {
                      resolve({
                        actualizado: false,
                        indexEvento: index,
                        codigoCompetencia: evento.competencia.codigo,
                        ordenResultado: evento.resultado.orden,
                        motivo: `No existe un resultado de aprendizaje con orden: ${evento.resultado.orden}`,
                      });
                    }
                  } else {
                    resolve({
                      actualizado: false,
                      indexEvento: index,
                      codigoCompetencia: evento.competencia.codigo,
                      motivo: `Las horas a agregar de la competencia con código: ${evento.competencia.codigo} superan la duración de la competencia`,
                    });
                  }
                } else {
                  resolve({
                    actualizado: false,
                    indexEvento: index,
                    codigoCompetencia: evento.competencia.codigo,
                    motivo: `No existe una competencia con código: ${evento.competencia.codigo}`,
                  });
                }
              } else {
                resolve({
                  actualizado: false,
                  indexEvento: index,
                  ficha: evento.ficha.ficha,
                  motivo: `No existe un gestor de tiempo para la ficha: ${evento.ficha.ficha}`,
                });
              }
            })
              .then((data) => {
                msg.push(data);
              })
              .finally(() => {
                resolve('fin');
              });
          });
        }).finally(() => {
          resolve('true');
        });
        return msg;
      } else {
        return [
          'No se encontraron gestores de tiempo para las fichas enviadas',
        ];
      }
    }

    return ['Debe enviar un arreglo de eventos que no este vacío'];
  }
  async existeGestor(id_ficha: string): Promise<boolean> {
    return new Promise((resolve) => {
      resolve(
        this.gestorTModel.find({ ficha: id_ficha }).then((gestor) => {
          return gestor == null ? false : gestor.length == 0 ? false : true;
        }),
      );
    });
  }

  async obtenerGestoresPorFicha(ficha: any[]): Promise<any> {
    return await this.gestorTModel.find({ $or: ficha }).exec();
  }
  /**
   *
   * @param restarTiempoFichaDto Información para encontrar el gestor de la ficha, competencia y resultado de aprendizaje para restarle las horas.
   * @returns {boolean} Si se restaron las horas al resultado de aprendizaje enviado, retorna true, en otro caso, retorna false.
   */
  async restarTiempoFicha(
    restarTiempoFichaDto: RestarTiempoFichaDto,
  ): Promise<boolean> {
    const gestor = await this.obtenerGestor(restarTiempoFichaDto.ficha.ficha);

    if (gestor.length == 1) {
      const competenciasGestor = gestor[0].competencias;
      //Si el gestor tiene competencias
      if (competenciasGestor.length > 0) {
        const compIndex = competenciasGestor.findIndex(
          (competencia: any) =>
            competencia.codigo == restarTiempoFichaDto.competencia.codigo,
        );
        if (compIndex != -1) {
          const resuIndex = competenciasGestor[compIndex].resultados.findIndex(
            (resultado: any) =>
              resultado.orden == restarTiempoFichaDto.resultado.orden,
          );
          if (resuIndex != -1) {
            //Valido que el tiempo acumulado menos el que voy a restar no dé resultado negativo
            if (
              competenciasGestor[compIndex].resultados[resuIndex].acumulado -
                restarTiempoFichaDto.horas >=
              0
            ) {
              //Resto las horas al acumulado del resultado de aprendizaje
              competenciasGestor[compIndex].resultados[resuIndex].acumulado -=
                restarTiempoFichaDto.horas;
              //Resto las horas al acumulado de la competencia
              competenciasGestor[compIndex].acumulado -=
                restarTiempoFichaDto.horas;

              //Armo el objeto para actualizar los tiempos de la ficha en el gestor de tiempoCompetencia
              const actualizarTiempoFicha = {
                acumulado: gestor[0].acumulado - restarTiempoFichaDto.horas, //Acumulado de la ficha
                competencias: competenciasGestor,
              };

              return await this.gestorTModel
                .findOneAndUpdate(
                  { ficha: restarTiempoFichaDto.ficha.ficha },
                  actualizarTiempoFicha,
                )
                .then((gestor) => {
                  return gestor ? true : false;
                });
            }
          }
        }
      }
    }
    return false;
  }
}
