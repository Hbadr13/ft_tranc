import { Controller, Get, Param, ParseIntPipe} from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}


  @Get('/:userId')
  async getAllUsers(
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    return this.userService.findAllUsers(userId);
  }

}



