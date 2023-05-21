import { IsNotEmpty, IsString, Matches, IsMongoId } from 'class-validator';

export class CrearBloqueDto {
  @IsNotEmpty()
  @IsString()
  @Matches(/^(?!\s*$).+/, {
    message: 'El campo nombre no debe estar vacio',
  })
  readonly nombre: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^(?!\s*$).+/, {
    message: 'El campo nomenclatura no debe estar vacio',
  })
  readonly nomenclatura: string;
}

export class ActualizarBloqueDto {
  @IsNotEmpty()
  @IsString()
  @Matches(/^(?!\s*$).+/, {
    message: 'El campo id es obligatorio',
  })
  @IsMongoId()
  readonly id: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^(?!\s*$).+/, {
    message: 'El campo nombre no debe estar vacio',
  })
  readonly nombre: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^(?!\s*$).+/, {
    message: 'El campo nomenclatura no debe estar vacio',
  })
  readonly nomenclatura: string;
}
