import { Module } from '@nestjs/common';
import { GameController } from './game.controller';
import { GameService } from './game.service';
import { GameGateway } from './game.gateway';
import { UserService } from 'src/user/user.service';
import { UpdateModule } from './update/update.module';
import { RoomService } from './room/room.service';
import { RoomController } from './room/room.controller';
import { RoomModule } from './room/room.module';
import { UpdateService } from './update/update.service';

@Module({
  controllers: [GameController, RoomController],
  providers: [
    GameService,
    GameGateway,
    UserService,
    RoomService,
    UpdateService,
  ],
  imports: [UpdateModule, RoomModule],
})
export class GameModule {}
