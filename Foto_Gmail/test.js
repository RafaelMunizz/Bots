import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({headless:false});
const page = await browser.newPage();

await page.goto('C:\\Users\\rafae\\OneDrive\\Documentos\\Github\\Bots\\Foto_Gmail\\Login_Google1.html');