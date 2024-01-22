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
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('Carga masiva de competencias')
@Controller('carguemasivocompetencias')
export class CargueMasivoCompetenciasController {
  constructor(private readonly cargue: CargueMasivoCompetenciasService) {}
  @ApiBody({
    type: 'ObjectId',
    description: 'Programa: ObjectId del programa',
  })
  @Post('cargar')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(
            null,
            `${file.fieldname}-${uniqueSuffix}.${
              file.originalname.split('.')[1]
            }`,
          );
        },
      }),
    }),
  )
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body('programa') programa: string,
  ): Promise<string> {
    const result = await this.cargue.processCsv(file, programa);
    return result;
  }
}
