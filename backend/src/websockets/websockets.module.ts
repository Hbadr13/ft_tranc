import { Module } from '@nestjs/common';
import { OnlineUsersGateway } from './online-users.gateway';

@Module({
  providers: [OnlineUsersGateway],
})
export class WebsocketsModule {}
