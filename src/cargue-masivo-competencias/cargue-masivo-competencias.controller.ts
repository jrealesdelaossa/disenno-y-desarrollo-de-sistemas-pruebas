import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CargueMasivoCompetenciasService } from './cargue-masivo-competencias.service';
import { diskStorage } from 'multer';

@Controller('carguemasivocompetencias')
export class CargueMasivoCompetenciasController {
  constructor(private readonly cargue: CargueMasivoCompetenciasService) {}
  @Post('cargar')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          console.log(file);
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, file.fieldname + '-' + uniqueSuffix + '.csv');
        },
      }),
    }),
  )
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body('programa') programa: string,
  ): Promise<string> {
    console.log(programa);
    const result = await this.cargue.processCsv(file, programa);
    return result;
  }
}
