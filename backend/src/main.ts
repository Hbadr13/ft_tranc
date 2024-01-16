import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { UnauthorizedException, ValidationPipe } from '@nestjs/common';
import * as  cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';
import * as express from 'express';
import { HttpExceptionFilter } from './auth/common/filters/HttpExceptionFilter';
import { JwtMiddleware } from './auth/jwt/jwt.middleware';
import { JwtService } from '@nestjs/jwt';







import { IoAdapter } from '@nestjs/platform-socket.io';
import { Constant } from './constants/constant';

async function bootstrap() {
    dotenv.config();
    const app = await NestFactory.create(AppModule);
    app.use(cookieParser());
    app.enableCors({
        // origin: 'http://localhost:3000',
        // origin: 'http://192.168.43.146:3000',
        origin: Constant.API_URL,
        credentials: true
    })


    // app.use((req, res, next) => new JwtMiddleware(jwtService).use(req, res, next));
    // const jwtService = app.get(JwtService);

    // Apply JwtMiddleware globally

    app.useGlobalPipes(new ValidationPipe({
        whitelist: true,
    }));
    app.use(express.json({ limit: '300mb' }));
    app.useGlobalFilters(new HttpExceptionFilter());
    app.use(express.urlencoded({ limit: '300mb', extended: true }));


    // app.use(cors());
    await app.listen(3333);
}
bootstrap();


