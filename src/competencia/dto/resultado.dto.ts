import { IsNotEmpty, IsNumber, IsOptional, Matches } from 'class-validator';

export class resultadoDto {
  @IsNotEmpty()
  @Matches(/^(?!\s*$).+/, {
    message: 'El codigo del programa no puede estar vacío',
  })
  readonly descripcion: string;

  @Matches(/^(?!\s*$).+/, { message: 'El nombre no puede estar vacío' })
  @IsNotEmpty()
  @IsNumber()
  readonly duracion: number;

  @Matches(/^(?!\s*$).+/, { message: 'El orden no puede estar vacío' })
  @IsNotEmpty()
  @IsOptional()
  readonly orden: number;
}
