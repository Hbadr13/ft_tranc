import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { FriendsModule } from './friends/friends.module';
import { JwtModule } from '@nestjs/jwt';
import { GameGateway } from './game/game.gateway';
import { OnlineGateway } from './online/online.gateway';
import { WebsocketsModule } from './websockets/websockets.module';
import { UserService } from './user/user.service';



@Module({
    imports: [
        JwtModule.register({
            secret: process.env.JWT_SECRET, // Replace with your actual secret key
            signOptions: { expiresIn: '1h' }, // Set the token expiration time
        }),
        ConfigModule.forRoot({
            isGlobal: true
        }), AuthModule, UserModule, BookmarkModule, PrismaModule, FriendsModule, WebsocketsModule],
    providers: [GameGateway, OnlineGateway, UserService],
})
export class AppModule { }
