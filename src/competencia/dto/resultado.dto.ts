import { IsNotEmpty, IsOptional, Matches } from 'class-validator';

export class resultadoDto {
  @IsNotEmpty()
  @Matches(/^(?!\s*$).+/, {
    message: 'El codigo del programa no puede estar vacío',
  })
  readonly descripcionResultado: string;

  @Matches(/^(?!\s*$).+/, { message: 'El nombre no puede estar vacío' })
  @IsNotEmpty()
  readonly duracionResultado: string;

  @Matches(/^(?!\s*$).+/, { message: 'El orden no puede estar vacío' })
  @IsNotEmpty()
  @IsOptional()
  readonly orden: number;
}
