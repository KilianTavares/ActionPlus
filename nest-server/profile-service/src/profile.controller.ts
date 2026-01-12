import { Controller, Get, Query } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { mockUsers } from './data/mock-users';

@Controller('profile')
export class ProfileController {
  @MessagePattern({ cmd: 'profile' })
  userProfile(@Payload() userID: string) {
    return mockUsers.find((user) => user.id === userID);
  }
  @MessagePattern({ cmd: 'profile/preferences' })
  allUsers() {
    return mockUsers;
  }
}
