import { Injectable } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';

@Injectable()
export class AppService {
  private mathClient: ClientProxy;
  private stringClient: ClientProxy;

  constructor() {
    this.mathClient = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: { host: '127.0.0.1', port: 4001 },
    });
    this.stringClient = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: { host: '127.0.0.1', port: 4002 },
    });
  }

  async calculateSum(numbers: number[]): Promise<number> {
    return this.mathClient.send({ cmd: 'sum' }, numbers).toPromise();
  }

  async capitalizeString(data: string): Promise<string> {
    return this.stringClient.send({ cmd: 'capitalize' }, data).toPromise();
  }
}
