import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { env } from './constants/environment.constant'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const config = new DocumentBuilder()
    .setTitle('Post API')
    .setDescription('The API for SkinX assignment')
    .setContact(
      'Woramet Woratat',
      'https://github.com/w0rametA',
      'woramet.woratat@gmail.com',
    )
    .addBearerAuth()
    .build()

  const document = SwaggerModule.createDocument(app, config)

  app.enableCors({
    methods: 'GET,PUT,PATCH,POST,DELETE',
    exposedHeaders: ['Content-Disposition', 'Retry-After'],
  })
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  )

  SwaggerModule.setup('docs', app, document, {
    jsonDocumentUrl: 'docs/json',
  })
  await app.listen(env.port ?? 4000)
}
bootstrap()
