import {imageFromGmail} from "./bot_imageGoogle.js";
import puppeteer from 'puppeteer';
import http from 'http';
import fs from 'fs';
import path from 'path';

///////////////// CRIAÇÃO DOS SERVIDORES ///////////////// 

// HTML GOOGLE1
const server = http.createServer((req, res) => {
  //const filePath = path.join(__dirname, 'Login_Google1.html');
  const filePath = path.join('C:\\Users\\rafae\\OneDrive\\Documentos\\Github\\Bots\\Foto_Gmail\\Login_Google1.html');
  const fileContent = fs.readFileSync(filePath, 'utf8');
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write(fileContent);
  res.end();
});

server.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000/');
});

// HTML GOOGLE2
const server2 = http.createServer((req, res) => {
  //const filePath = path.join(__dirname, 'Login_Google1.html');
  const filePath = path.join('C:\\Users\\rafae\\OneDrive\\Documentos\\Github\\Bots\\Foto_Gmail\\Login_Google2.html');
  const fileContent = fs.readFileSync(filePath, 'utf8');
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write(fileContent);
  res.end();
});

server2.listen(3010, () => {
  console.log('Servidor rodando em http://localhost:3010/');
});

////////////////////////////////////////////////////////////////


const nameEmail = 'goftsttpcg@gmail.com';
const imageEmail = 'https://lh3.googleusercontent.com/a/AGNmyxac0UA16LPvS_CcZUoci1OF5foL2ZEr0iHsvobuZA=s24-p' // Imagem de teste
//const imageEmail = await imageFromGmail(nameEmail);

// true: Não aparece / false: aparece
const browser = await puppeteer.launch({headless:false});
const page = await browser.newPage();

//await page.goto('C:\\Users\\rafae\\OneDrive\\Documentos\\Github\\Bots\\Foto_Gmail\\Login_Google1.html');
await page.goto('http://localhost:3000');

await page.evaluate((nameEmail, imageEmail) => {
  
  const minhaDiv = document.querySelector('#UserName');
  const img = document.querySelector('img');
  
  minhaDiv.textContent = nameEmail;
  img.src = imageEmail;
  
}, nameEmail, imageEmail);



