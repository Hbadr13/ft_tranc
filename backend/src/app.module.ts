import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { GameGateway } from './game/game.gateway';

@Module({
  imports: [],
  controllers: [],
  providers: [ChatGateway, GameGateway],
})
export class AppModule {}
