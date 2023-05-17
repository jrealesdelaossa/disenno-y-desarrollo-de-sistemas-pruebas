import { IsNotEmpty, IsOptional, Matches } from 'class-validator';
export class Centro_Dto {
  @IsNotEmpty()
  @Matches(/^(?!\s*$).+/, { message: 'El codigo no puede ser estar vacío' })
  private codigo: string;
  @IsNotEmpty()
  @Matches(/^(?!\s*$).+/, { message: 'El nombre no puede ser estar vacío' })
  private nombre: string;
  @IsNotEmpty()
  @Matches(/^(?!\s*$).+/, { message: 'La regional no puede ser estar vacía' })
  private regional: string;
  @IsNotEmpty()
  @Matches(/^(?!\s*$).+/, { message: 'El municipio no puede ser estar vacío' })
  private municipio: string;

  public get _id(): string {
    return this._id;
  }
  public get _codigo(): string {
    return this.codigo;
  }
  public set _codigo(value: string) {
    this.codigo = value;
  }

  public get _nombre(): string {
    return this.nombre;
  }
  public set _nombre(value: string) {
    this.nombre = value;
  }

  public get _regional(): string {
    return this.regional;
  }
  public set _regional(value: string) {
    this.regional = value;
  }

  public get _municipio(): string {
    return this.municipio;
  }
  public set _municipio(value: string) {
    this.municipio = value;
  }
}

export class UpdateCentroDto {
  @IsNotEmpty()
  @Matches(/^(?!\s*$).+/, { message: 'El id no puede ser estar vacío' })
  private id: string;
  @IsNotEmpty()
  @Matches(/^(?!\s*$).+/, { message: 'El codigo no puede ser estar vacío' })
  @IsOptional()
  private codigo: string;
  @IsNotEmpty()
  @Matches(/^(?!\s*$).+/, { message: 'El nombre no puede ser estar vacío' })
  @IsOptional()
  private nombre: string;
  @IsNotEmpty()
  @Matches(/^(?!\s*$).+/, { message: 'La regional no puede ser estar vacía' })
  @IsOptional()
  private regional: string;
  @IsNotEmpty()
  @Matches(/^(?!\s*$).+/, { message: 'El municipio no puede ser estar vacío' })
  @IsOptional()
  private municipio: string;
  public get _id(): string {
    return this.id;
  }
  public set _id(value: string) {
    this.id = value;
  }
}
