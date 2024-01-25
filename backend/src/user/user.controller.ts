import {
  Controller,
  Get,
  Post,
  Param,
  ParseIntPipe,
  Body,
  Request,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get('/:userId')
  async getAllUsers(@Param('userId') userId: string) {
    // console.log(userId)
    return this.userService.findAllUsers(Number(userId));
  }
  @Get('other/userId')
  async findAautherUsers(@Req() req) {
    console.log("--------><" ,req['id'])
    return this.userService.findAautherUsers(Number(req['id']));
  }
  @Get('one/:userName/:userId')
  async getOneUsers(
    @Param('userName') userName: string,
    @Param('userId') userId,
  ) {
    // console.log('userId--->', userId);
    // console.log('userName--->', userName);
    return this.userService.findOneUsers(Number(userId), userName);
  }
  @Post('update_info')
  async update_name(@Body() bd: any, @Param('userId') userId: string, @Req() req) {
    return this.userService.apdate_user(
      Number(req['id']),
      bd.username,
      bd.foto_user,
      bd.email,
    );
  }
  @Get('getbyuserid/:userId')
  async getByUserId(@Request() req: any, @Param('userId') userId: string) {
    return await this.userService.findByUserId(Number(userId));
  }
  @Post('enable-2fa')
  async enableTwoFactor(@Param('userId') userId: string,  @Req() req) {
    // Assuming user is authenticated
    const secret = await this.userService.enableTwoFactor(Number(req['id']));

    return {
      message: 'Two-Factor Authentication enabled',
      secret,
    };
  }
  @Post('DeactivateTwoFactor')
  async DeactivateTwoFactor(@Param('userId') userId: string, @Req() req) {
    // Assuming user is authenticated
    const secret = await this.userService.DeactivateTwoFactor(Number(req['id']));

    return {
      message: 'Two-Factor Authentication enabled',
      secret,
    };
  }
}
