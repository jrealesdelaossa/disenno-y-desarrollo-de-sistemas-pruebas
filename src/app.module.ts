import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SedesModule } from './sedes/sedes.module';
import { MongooseModule } from '@nestjs/mongoose';
import { RegionalModule } from './regional/regional.module';
import { CentroModule } from './centro/centro.module';
import { AmbienteModule } from './ambiente/ambiente.module';
import { BloqueModule } from './bloque/bloque.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://root:12345@ac-xfzwvbk-shard-00-00.kkgtidf.mongodb.net:27017,ac-xfzwvbk-shard-00-01.kkgtidf.mongodb.net:27017,ac-xfzwvbk-shard-00-02.kkgtidf.mongodb.net:27017/Eventos?replicaSet=atlas-9o4jeb-shard-0&ssl=true&authSource=admin',
    ),
    CentroModule,
    SedesModule,
    RegionalModule,
    AmbienteModule,
    BloqueModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }