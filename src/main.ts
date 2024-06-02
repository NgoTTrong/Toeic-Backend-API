import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { environments } from './environments';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //use for testing only, we will remove later.
  app.enableCors();
  // GlobalPipes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      exceptionFactory: (errors) => new BadRequestException(errors),
    }),
  );

  await app.listen(environments.port || 3001, () =>
    console.log(`Server is running in port ${environments.port || 3001}`),
  );
}
bootstrap();
