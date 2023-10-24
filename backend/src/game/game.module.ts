import { Module } from '@nestjs/common';
import { GameController } from './game.controller';
import { GameService } from './game.service';
import { GameGateway } from './game.gateway';
import { UserService } from 'src/user/user.service';
import { UpdateModule } from './update/update.module';


@Module({
  controllers: [GameController],
  providers: [GameService, GameGateway, UserService],
  imports: [UpdateModule],
})
export class GameModule { }
