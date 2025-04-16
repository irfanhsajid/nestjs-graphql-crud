import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  // defining route http://localhost:3000/say-hi
  @Get('say-hi')
  sayHi(): string {
    return 'Hello Hi Bye Bye';
  }
  // function name doesn't need to be same
  @Get('bismillah')
  sayB() {
    return this.appService.sayBismillah();
  }
}
