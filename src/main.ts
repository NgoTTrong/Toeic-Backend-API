import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { environments } from './environments';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //use for testing only, we will remove later.
  app.enableCors({
    origin: 'http://localhost:3000',
  });

  await app.listen(environments.port || 3001, () =>
    console.log(`Server is running in port ${environments.port}`),
  );
}
bootstrap();
