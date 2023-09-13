import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { createReadStream } from 'fs';
import * as readline from 'readline';
import { competenciaDto } from '../competencia/dto/competencia.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Competencia } from '../competencia/schema/competencia.schema';
import { Model } from 'mongoose';
import * as iconv from 'iconv-lite';

@Injectable()
export class CargueMasivoCompetenciasService {
  constructor(
    @InjectModel(Competencia.name) private competenciaModel: Model<Competencia>,
  ) {}

  async processCsv(
    file: Express.Multer.File,
    programa: string,
  ): Promise<string> {
    const fileStream = createReadStream(file.path);
    const converterStream = iconv.decodeStream('utf-8');

    const obj = {
      programa: programa,
      competencias: [],
    };

    const rl = readline.createInterface({
      input: fileStream.pipe(converterStream),
      crlfDelay: Infinity,

      // Reconocer tanto '\r\n' como '\n' como fin de línea
    });

    for await (const line of rl) {
      const registro = line.split(';');

      const compe = {
        codigo: registro[0],
        nombre: registro[1],
        duracion: parseInt(registro[2]),
        resultados: [],
      };

      for (let x = 3; x < registro.length; x += 3) {
        if (registro[x] != '') {
          const pq = {
            descripcion: registro[x],
            orden: registro[x + 1],
            duracion: parseInt(registro[x + 2]),
          };
          compe.resultados.push(JSON.parse(JSON.stringify(pq)));
        } else break;
      }
      obj.competencias.push(JSON.parse(JSON.stringify(compe)));
    }

    fs.unlinkSync(file.path);
    this.crearCompetencia(obj);
    return 'ok';
  }

  async crearCompetencia(competencia: competenciaDto): Promise<Competencia> {
    const newCompetencia = new this.competenciaModel(competencia);
    return await newCompetencia.save();
  }
}
