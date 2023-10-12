import { Controller, Get, Param} from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}


  @Get('/:userId')
  async getAllUsers(
    @Param('userId', parseInt) userId: number,
  ) {
    return this.userService.findAllUsers(userId);
  }

}



