import { Controller, ParseUUIDPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { loginDTO, signUpDTO } from './dto/auth-dto';

@Controller()
export class AuthController {
  @MessagePattern({ cmd: 'login' })
  login(@Payload() loginDTO: loginDTO) {
    return loginDTO;
  }
  @MessagePattern({ cmd: 'signUp' })
  signUp(@Payload() signupDTO: signUpDTO) {
    return signupDTO;
  }
}
