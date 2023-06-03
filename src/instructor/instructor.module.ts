import { Module } from '@nestjs/common';
import { InstructorController } from './instructor.controller';
import { InstructorService } from './instructor.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Instructor, InstructorSchema } from './schema/instructor.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Instructor.name, schema: InstructorSchema },
    ]),
  ],
  controllers: [InstructorController],
  providers: [InstructorService],
})
export class InstructorModule {}
