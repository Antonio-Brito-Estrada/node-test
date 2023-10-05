// Importa el módulo 'http'
const http = require('http');
var express = require('express')
    ,bodyParser = require('body-parser');
// Configura el servidor HTTP para responder con "Hola Mundo" a todas las solicitudes
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hola Mundo\n');
});

var app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())

app.get("/hola", function (request, response) {
    response.send('Simple WhatsApp Webhook tester');
  });

// Escucha en el puerto 3000
const port = 3000;
server.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});