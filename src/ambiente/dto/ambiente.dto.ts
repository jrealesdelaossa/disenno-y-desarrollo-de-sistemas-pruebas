import { IsNotEmpty, IsObject, IsOptional, IsString } from "class-validator";

export class CreatedAmbienteDTO{
    
    @IsNotEmpty()
    @IsString()
    readonly codigo: string

    @IsNotEmpty()
    @IsString()
    readonly bloque: string;

    @IsNotEmpty()
    @IsString()
    readonly tipo: string;

    @IsNotEmpty()
    @IsObject()
    readonly sede: object;

}

export class UpdateAmbienteDTO{
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    readonly bloque?: string;

    @IsNotEmpty()
    @IsString()
    @IsOptional()
    readonly tipo?: string;

    @IsNotEmpty()
    @IsObject()
    @IsOptional()
    readonly sede?: object;

}