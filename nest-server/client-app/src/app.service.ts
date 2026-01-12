import { Injectable } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { loginDTO, signUpDTO } from './dto/auth-dto';

@Injectable()
export class AppService {
  private authClient: ClientProxy;
  private profileClient: ClientProxy;
  constructor() {
    this.authClient = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: { host: '127.0.0.1', port: 4001 },
    });

    this.profileClient = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: { host: '127.0.0.1', port: 4002 },
    });
  }
  async loginUser(loginDto: loginDTO): Promise<any> {
    return this.authClient.send({ cmd: 'login' }, loginDto).toPromise();
  }
  async signUpUser(signUpDTO: signUpDTO): Promise<any> {
    return this.authClient.send({ cmd: 'signUp' }, signUpDTO).toPromise();
  }

  async getUserProfile(userID: string): Promise<any> {
    return this.profileClient.send({ cmd: 'profile' }, userID).toPromise();
  }
}
