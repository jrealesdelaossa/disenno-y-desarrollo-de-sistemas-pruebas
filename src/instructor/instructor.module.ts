import { Module } from '@nestjs/common';
import { InstructorController } from './instructor.controller';
import { InstructorService } from './instructor.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Instructor, InstructorSchema } from './schema/instructor.schema';
import { TipoDeVinculacionModule } from '../tipo-de-vinculacion/tipo-de-vinculacion.module';
import { ProgramaModule } from 'src/programa/programa.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Instructor.name, schema: InstructorSchema },
    ]),
    TipoDeVinculacionModule,
    ProgramaModule,
  ],
  controllers: [InstructorController],
  providers: [InstructorService],
})
export class InstructorModule {}
