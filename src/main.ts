import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { environments } from './environments';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.listen(environments.port || 3001, () =>
    console.log(`Server is running in port ${environments.port}`),
  );
}
bootstrap();
