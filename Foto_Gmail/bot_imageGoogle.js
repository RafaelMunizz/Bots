
const puppeteer = require('puppeteer');

(async () => {

    // DADOS DA CONTA QUE IRÁ PEGAR AS FOTOS
    const email = 'testlaboratory927@gmail.com';
    const senha = 'TestSTTP!2023';

    // DADOS DE QUEM DEVERÁ PEGAR A FOTO
    const email_alvo = 'filipeferibeiro@gmail.com';



    //Inicia o navegador Puppeteer e atribui o objeto Browser retornado a uma constante chamada "browser". 
    //O parâmetro {headless:false} define se o navegador será executado em modo headless (sem interface gráfica) ou não. Neste caso, o modo headless é desativado.
    const browser = await puppeteer.launch({headless:true, args: ['--disable-blink-features=AutomationControlled'] });

    // Cria uma nova página no navegador e atribui o objeto Page retornado a uma constante chamada "page".
    const page = await browser.newPage();

    //  Navega para a página especificada.
    await page.goto('https://mail.google.com/mail/u/0/?tab=wm#inbox?compose=new');



    // DIGITAR EMAIL E AVANÇAR: 

    // Digitar a string na tag com a class específicada
    await page.type('.whsOnd.zHQkBf', email);
    // Clicar no botão com a class especificada
    await page.click('.VfPpkd-LgbsSe.VfPpkd-LgbsSe-OWXEXe-k8QpJ.VfPpkd-LgbsSe-OWXEXe-dgl2Hf.nCP5yc.AjY5Oe.DuMIQc.LQeN7.qIypjc.TrZEUc.lw1w4b');


    // Identificando se ou o texto "Olá!" ou o nome do usuário estão aparecendo, que é o indicativo da etapa seguinte
    const textSelector = await page.waitForSelector(
        'text/Esqueceu a senha?'
    );

    // Esperar 1 segundo para colocar a senha, porque senão colocará o email e a senha no mesmo campo
    await page.waitForTimeout(1000);




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

    // Esperar a página carregar completamente antes de agir
    await page.waitForNavigation();
    


    // PARTE QUE JÁ ESTÁ LOGADO NO EMAIL

    // Clicar para escrever um novo email
    await page.click('.T-I.T-I-KE.L3');

    // Esperar 1 segundo para aparecer a caixa de envio, porque senão colocará o email alvo cortado
    await page.waitForTimeout(1000);
    
    // Digitar a string na tag com a class específicada
    await page.type('.agP.aFw', email_alvo);

    // Pressione a tecla Enter
    await page.keyboard.press('Enter');

    // Espere até que a tag <img> desejada esteja disponível na tela e pegue o atributo peoplekit-id
    const imgElement =  await page.waitForSelector('img[peoplekit-id="HiaYvf"]');

    // Extraia o link da imagem a partir do atributo data-src
    const imgUrl = await page.evaluate(img => img.getAttribute('data-src'), imgElement);

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

})();