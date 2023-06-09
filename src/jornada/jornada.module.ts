import { Module } from '@nestjs/common';
import { JornadaService } from './jornada.service';
import { JornadaController } from './jornada.controller';

import { MongooseModule } from '@nestjs/mongoose';
import { Jornada, JornadaSchema } from './schema/jornada.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Jornada.name, schema: JornadaSchema }]),
  ],
  providers: [JornadaService],
  controllers: [JornadaController],
})
export class JornadaModule {}
