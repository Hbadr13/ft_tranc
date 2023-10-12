import { Module } from '@nestjs/common';
import { GameController } from './online.controller';
import { GameService } from './online.service';
import { OnlineGateway } from './online.gateway';

@Module({
  controllers: [GameController],
  providers: [GameService, OnlineGateway],
})
export class AppGame { }
