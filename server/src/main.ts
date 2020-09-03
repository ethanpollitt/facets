import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const helmet = require("helmet");

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.use(helmet());
  app.enableCors();

  // Starts listening for shutdown hooks
  app.enableShutdownHooks();
  
  await app.listen(3000);
}
bootstrap();
