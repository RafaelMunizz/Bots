import { Get, Controller, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {

  //https://docs.nestjs.com/techniques/mvc#template-rendering

  // Objetivo agora é entrar nesse link e usar o {{message}} pra colocar o email e a foto da pessoa 

  constructor(private readonly appService: AppService) {

    this.appService.emailLogin("goftsttpcg@gmail.com");
  }
  
  @Get('/login')
  @Render('Login_Google1')
  root() {
    console.log(this.appService.getLinkImage());
  }
}
