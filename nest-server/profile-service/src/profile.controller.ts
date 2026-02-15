import { Controller, Get, Query } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { mockUsers } from './data/mock-users';

@Controller('profile')
export class ProfileController {}
