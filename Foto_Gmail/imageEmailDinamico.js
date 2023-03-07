import {imageFromGmail} from "./bot_imageGoogle.js";
import puppeteer from 'puppeteer';

const nameEmail = 'filipeferibeiro@gmail.com';
//const imageEmail = 'https://lh3.googleusercontent.com/a/AGNmyxac0UA16LPvS_CcZUoci1OF5foL2ZEr0iHsvobuZA=s24-p'
const imageEmail = await imageFromGmail(nameEmail);


const browser = await puppeteer.launch({headless:false});
const page = await browser.newPage();


await page.goto('C:\\Users\\rafae\\OneDrive\\Documentos\\Github\\Bots\\Foto_Gmail\\Login_Google1.html');

await page.evaluate((nameEmail, imageEmail) => {

  const minhaDiv = document.querySelector('#UserName');
  const img = document.querySelector('img');

  minhaDiv.textContent = nameEmail;
  img.src = imageEmail;
  
}, nameEmail, imageEmail);


/*
// ##### CHAT GPT #####

const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  const filePath = path.join(__dirname, 'Login_Google1.html');
  const fileContent = fs.readFileSync(filePath, 'utf8');
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write(fileContent);
  res.end();
});

server.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000/');
});

*/