import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }


  @Get('/:userId')
  async getAllUsers(
    @Param('userId') userId) {
    // console.log(userId)
    return this.userService.findAllUsers(Number(userId));
  }
  @Get('one/:userName/:userId')
  async getOneUsers(@Param('userName') userName: string,
    @Param('userId') userId) {
    console.log('userId--->', userId)
    console.log('userName--->', userName)
    return this.userService.findOneUsers(Number(userId), userName);
  }

}
