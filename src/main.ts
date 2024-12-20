import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './errors/custom-api-error';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { config } from 'process';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useGlobalFilters(new AllExceptionsFilter());
  //swagger
  const configSwagger = new DocumentBuilder()
    .setTitle('Point of sale documentation')
    .setDescription('Api for pos of point')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('docs', app, document);

  // const documentFactory = () =>
  //   SwaggerModule.createDocument(app, configSwagger);
  // SwaggerModule.setup('docs', app, documentFactory, {
  //   jsonDocumentUrl: 'docs/json',
  // });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
