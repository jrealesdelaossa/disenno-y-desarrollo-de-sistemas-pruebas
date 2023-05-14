import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { ValidationPipe } from '@nestjs/common/pipes';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     // elimina los campos que no esten definidos en el dto
  //     // whitelist: true,
  //     // marca como error los campos que no esten definidos en el dto
  //     forbidNonWhitelisted: true,
  //   }),
  // );
  await app.listen(3000);
}
bootstrap();
