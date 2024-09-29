import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as session from 'express-session';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger setup for API documentation
  const config = new DocumentBuilder()
    .setTitle('API')
    .setDescription('API documentation for our robust application')
    .setVersion('1.0')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // Expose Swagger UI at /api

  // Set global prefix for all routes
  app.setGlobalPrefix('api');

  // Setup session middleware
  app.use(
    session({
      secret: '6ytrew21!2wsxzaQ1!0okmnhy6', // Use a strong, secret key for signing the session ID
      resave: false,
      saveUninitialized: false,
      cookie: { 
        maxAge: 3600000, // 1 hour session expiration
      },
    }),
  );

  app.enableCors({
    origin: 'http://localhost:3000', // Replace with your frontend domain
    credentials: true, // Allow credentials (cookies) to be sent
  });

  // Passport middleware setup
  app.use(passport.initialize());
  app.use(passport.session());

  // Start listening on the port after the middleware is applied
  await app.listen(3005);
}

bootstrap();
