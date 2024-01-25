import { Module } from '@nestjs/common';
import { OnlineController } from './online.controller';
import { OnlineService } from './online.service';
import { OnlineGateway } from './online.gateway';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [OnlineController],
  providers: [OnlineService, OnlineGateway, JwtService],
})
export class OnlineModule { }
