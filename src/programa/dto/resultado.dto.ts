import { IsNotEmpty, Matches } from 'class-validator';

export class resultadoDto {
  @IsNotEmpty()
  @Matches(/^(?!\s*$).+/, {
    message: 'El codigo del programa no puede estar vacío',
  })
  readonly descripcion_result: string;

  @Matches(/^(?!\s*$).+/, { message: 'El nombre no puede ser estar vacío' })
  @IsNotEmpty()
  readonly duracion_result: string;
}
