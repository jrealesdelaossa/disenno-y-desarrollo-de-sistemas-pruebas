import { IsNotEmpty, Matches } from 'class-validator';

export class jornadaDto {
  @IsNotEmpty()
  @Matches(/^(?!\s*$).+/, {
    message: 'El día no puede estar vacío',
  })
  readonly dia: string;

  @Matches(/^(?!\s*$).+/, { message: 'La jornada no puede estar vacia' })
  @IsNotEmpty()
  readonly jornada: string;

  @IsNotEmpty()
  readonly horaInicio: string;

  @IsNotEmpty()
  readonly horaFin: string;
}
