import { Injectable } from '@nestjs/common';

@Injectable()
export class GameService {
  game(): any {
    return 'hi2';
  }
}
