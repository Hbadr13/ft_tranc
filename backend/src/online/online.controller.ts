import { Controller, Get } from '@nestjs/common';
import { GameService } from './online.service';

@Controller('')
export class GameController {
  constructor(private readonly gameCont: GameService) { }
  @Get()
  game(): any {
    // console.log('hii');
    return this.gameCont.game();
  }
}
