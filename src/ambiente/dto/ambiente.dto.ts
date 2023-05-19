import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatedAmbienteDTO {
  @IsNotEmpty()
  @IsString()
  readonly codigo: string;

  @IsNotEmpty()
  @IsString()
  readonly bloque: string;

  @IsNotEmpty()
  @IsString()
  readonly tipo: string;

  @IsNotEmpty()
  @IsString()
  readonly sede: string;
}

export class UpdateAmbienteDTO {
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  readonly bloque: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  readonly tipo: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  readonly sede: string;

  @IsString()
  readonly id: string;

  public get _id(){
    return this._id;
  }
}
