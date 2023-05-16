import { Module } from '@nestjs/common';
import { AmbienteController } from './ambiente.controller';
import { AmbienteService } from './ambiente.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AmbienteSchema } from './schemas/ambiente.schema';

@Module({
    exports: [MongooseModule.forFeature(
        [
            { name: 'Ambiente', schema: AmbienteSchema }
        ])
    ],
    controllers: [AmbienteController],
    providers: [AmbienteService]
})
export class AmbienteModule { }
