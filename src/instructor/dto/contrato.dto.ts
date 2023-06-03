import {
  IsNotEmpty,
  IsString,
  Matches,
  IsNumber,
  IsMongoId,
} from 'class-validator';

export class ContratoDto {
  @IsNotEmpty()
  @IsNumber()
  @Matches(/^(?!\s*$).+/, {
    message: 'El campo numero no debe estar vacio',
  })
  readonly numero: number;

  @IsNotEmpty()
  @IsString()
  @Matches(/^(?!\s*$).+/, {
    message: 'El campo fecha de inicio no debe estar vacio',
  })
  readonly fechaInicio: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^(?!\s*$).+/, {
    message: 'El campo fecha de inicio no debe estar vacio',
  })
  readonly fechaTerminacion: string;

  @IsNotEmpty()
  @IsString()
  @IsMongoId()
  @Matches(/^(?!\s*$).+/, {
    message: 'El campo fecha de inicio no debe estar vacio',
  })
  readonly tipoVinculacion: string;
}
