import {
  Controller,
  Get,
  Post,
  Param,
  ParseIntPipe,
  Body,
} from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/:userId')
  async getAllUsers(@Param('userId') userId: string) {
    // console.log(userId)
    return this.userService.findAllUsers(Number(userId));
  }
  @Get('one/:userName/:userId')
  async getOneUsers(
    @Param('userName') userName: string,
    @Param('userId') userId,
  ) {
    console.log('userId--->', userId);
    console.log('userName--->', userName);
    return this.userService.findOneUsers(Number(userId), userName);
  }
  @Post('update_info/:userId')
  async update_name(@Body() bd: any, @Param('userId') userId: string) {
    return this.userService.apdate_user(
      Number(userId),
      bd.username,
      bd.foto_user,
      bd.email,
    );
  }
  @Get('getbyuserid/:userId')
  async getByUserId(@Param('userId') userId: string) {
    console.log('userId--->', userId);
    // console.log('userName--->', userName)
    return this.userService.findByUserId(Number(userId));
  }
}
