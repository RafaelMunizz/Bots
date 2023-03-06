
import puppeteer from 'puppeteer'; // Automação
//import fs from 'fs'; // O módulo "fs" é nativo do Node.js e é usado para trabalhar com o sistema de arquivos do computador.

export async function imageFromGmail() {

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

    // DADOS DE QUEM DEVERÁ PEGAR A FOTO
    const email_alvo = 'goftsttpcg@gmail.com';

    //Inicia o navegador Puppeteer e atribui o objeto Browser retornado a uma constante chamada "browser". 
    //O parâmetro {headless:false} define se o navegador será executado em modo headless (sem interface gráfica) ou não. Neste caso, o modo headless é desativado.
    const browser = await puppeteer.launch({
        headless: false, 
        args: ['--disable-blink-features=AutomationControlled']
     });

    // Cria uma nova página no navegador e atribui o objeto Page retornado a uma constante chamada "page".
    const page = await browser.newPage();

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
    await page.waitForNavigation();

    // PARTE QUE JÁ ESTÁ LOGADO NO EMAIL
    
    // Digitar a string na tag com a class específicada
    await page.type('.fX.aiL', email_alvo); // Nova "class" do Gmail (que atualiza de tempos em tempos)
 
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

    return imgUrl;

};

imageFromGmail();