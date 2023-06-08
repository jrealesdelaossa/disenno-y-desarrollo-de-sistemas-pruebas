import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
const cors = require('cors');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      //Para que valide bien los espacios vacíos o nulos
      //skipMissingProperties: false,
      // elimina los campos que no esten definidos en el dto
      //whitelist: true,
      // marca como error los campos que no esten definidos en el dto
      // forbidNonWhitelisted: true,
    }),
  );
  app.use(cors());
  await app.listen(process.env.PORT);
}
bootstrap();
