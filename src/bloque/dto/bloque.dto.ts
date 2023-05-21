import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class Bloque_Dto {
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  public id: string;

  @IsNotEmpty()
  @IsString()
  private nombre: string;

  @IsNotEmpty()
  @IsString()
  private nomenclatura: string;

  public get _id(): string {
    return this.id;
  }
  // public set _id(value: string) {
  //   this.id = value;
  // }

  public get _nombre(): string {
    return this.nombre;
  }
  public set _nombre(value: string) {
    this.nombre = value;
  }

  public get _nomenclatura(): string {
    return this.nomenclatura;
  }
  public set _nomenclatura(value: string) {
    this.nomenclatura = value;
  }
}

export class CreateBloque_Dto {
  @IsNotEmpty()
  @IsString()
  private id: string;

  @IsNotEmpty()
  @IsString()
  private nombre: string;

  @IsNotEmpty()
  @IsString()
  private nomenclatura: string;

  public get _id(): string {
    return this.id;
  }

  public get _nombre(): string {
    return this.nombre;
  }
  public set _nombre(value: string) {
    this.nombre = value;
  }

  public get _nomenclatura(): string {
    return this.nomenclatura;
  }
  public set _nomenclatura(value: string) {
    this.nomenclatura = value;
  }
}
