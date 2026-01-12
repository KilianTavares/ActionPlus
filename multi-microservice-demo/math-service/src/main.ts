import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: { host: '127.0.0.1', port: 4001 },
    },
  );
  await app.listen();
  console.log(`Math Service is running on port ${process.env.PORT ?? 4001}`);
}
bootstrap();
