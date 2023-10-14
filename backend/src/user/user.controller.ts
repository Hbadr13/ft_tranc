import { Controller, Get, Param, ParseIntPipe} from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}


  @Get('/:userId')
  async getAllUsers(
  @Param('userId') userId) {
    // console.log(userId)
        return this.userService.findAllUsers(Number(userId));
  }

}



undefined