import {imageFromGmail} from "./bot_imageGoogle.js";

const imageEmail = await imageFromGmail();

const minhaDiv = document.querySelector('#imageUser');
minhaDiv.textContent = imageEmail;

console.log(imageEmail);



// ##### CHAT GPT #####


const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    const indexPath = path.join(__dirname, 'index.html');
    const indexContent = fs.readFileSync(indexPath, 'utf8');
    const mensagem = 'Olá, mundo! (atualizado)';
    const injetaScript = `<script>window.addEventListener('load', function() { const mensagem = "${mensagem}"; const mensagemEl = document.querySelector('#mensagem'); mensagemEl.textContent = mensagem; });</script>`;
    const indexContentComScript = indexContent.replace('</body>', `${injetaScript}</body>`);
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(indexContentComScript);
    res.end();
  } else {
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.write('404 Not Found');
    res.end();
  }
});

server.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}/`);
});

