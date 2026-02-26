const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, 'dist');
const htmlPath = path.join(distDir, 'index.html');
const assetsDir = path.join(distDir, 'assets');

const html = fs.readFileSync(htmlPath, 'utf8');
const cssFile = fs.readdirSync(assetsDir).find(f => f.endsWith('.css'));
const css = fs.readFileSync(path.join(assetsDir, cssFile), 'utf8');

const linkTag = `<link rel="stylesheet" crossorigin href="./assets/${cssFile}">`;
const styleTag = `<style>${css}</style>`;

const result = html.replace(linkTag, styleTag);
fs.writeFileSync(htmlPath, result, 'utf8');
console.log('Done! Inlined:', cssFile);
