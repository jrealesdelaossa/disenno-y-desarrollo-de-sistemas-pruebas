import { IsMongoId, IsNotEmpty, IsOptional, Matches } from 'class-validator';
import { competenciasDto } from './competencias.dto';

export class competenciaDto {
  @IsNotEmpty()
  @IsMongoId()
  @Matches(/^(?!\s*$).+/, {
    message: 'El codigo del programa no puede estar vacío',
  })
  readonly programa: string;

  @IsOptional()
  @IsNotEmpty()
  readonly competencias: competenciasDto[];
}
