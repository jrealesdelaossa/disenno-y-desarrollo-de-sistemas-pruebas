import { IsNotEmpty, IsObject, IsOptional, IsString } from 'class-validator';

export class CreatedTipoAmbienteDTO {

    @IsNotEmpty()
    @IsString()
    readonly codigo: string;
    
    @IsNotEmpty()
    @IsString()
    readonly nombre: string;

    @IsNotEmpty()
    @IsObject()
    readonly descripcion: object;
}


export class UpdateTipoAmbienteDTO{
    
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    readonly codigo?: string;
    
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    readonly nombre?: string;

    @IsNotEmpty()
    @IsObject()
    @IsOptional()
    readonly descripcion?: object;
}