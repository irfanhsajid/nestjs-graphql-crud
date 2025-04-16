import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  sayBismillah(): string {
    return 'Bismillahir Rahmanir Rahim';
  }
}
