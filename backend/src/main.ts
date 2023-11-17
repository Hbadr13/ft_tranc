import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common';
import *as  cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';
import * as express from 'express';


async function bootstrap() {
    dotenv.config();
    const app = await NestFactory.create(AppModule);
    app.use(cookieParser());
    app.enableCors({
        origin: 'http://localhost:3000',
        credentials: true
    })
    app.useGlobalPipes(new ValidationPipe({
        whitelist: true,
    }));
    app.use(express.json({ limit: '50mb' }));
    app.use(express.urlencoded({ limit: '50mb', extended: true }));
    // app.use(cors());
    await app.listen(3333);
}
bootstrap();


