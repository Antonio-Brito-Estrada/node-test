
// import { config } from 'dotenv';
var express = require('express')
    ,bodyParser = require('body-parser');
    const cors = require("cors");
    const { config } = require('dotenv');

config()
    // npm install dotenv  para la variable de entorno
var app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

app.get(`/`, (req, res) => {
  // console.log("entra a la barra /")
  return res.json({ message: `API DEPLOY SUCCESS` });
});

app.get("/test", function (request, response) {
  // console.log("entra a la barra /test")
  response.send('Prueba Local WhatsApp Webhook ');
});

app.get('/webhook', function(req, res) {
  if (
    req.query['hub.mode'] == 'subscribe' &&
    req.query['hub.verify_token'] == 'pruebaHDE'
    // req.query['hub.verify_token'] == process.env.SECRET
  ) {
    res.send(req.query['hub.challenge']);
  } else {
    res.sendStatus(400);
  }
});

app.post("/webhook", function (request, response) {
//   let contacto="", numero="", mensaje="";
//   contacto = JSON.stringify(request.body.entry[0].changes[0].value.contacts[0].profile.name);
//   numero = JSON.stringify(request.body.entry[0].changes[0].value.messages[0].from);
//   mensaje = JSON.stringify(request.body.entry[0].changes[0].value.messages[0].text.body);
//  console.log(response.json({ descripcionContacto: contacto, NumTelefono: numero, mensajeTexto: mensaje }))
// if(request.body){
//   console.log(" ")
//   console.log('Descripcion contacto: ' + JSON.stringify(request.body.entry[0].changes[0].value.contacts[0].profile.name))
//   console.log('Numero: ' + JSON.stringify(request.body.entry[0].changes[0].value.messages[0].from))
//   console.log('Mensaje: ' + JSON.stringify(request.body.entry[0].changes[0].value.messages[0].text.body))
//   console.log("<<<<<<<<<<<<<MENSAJE RECIBIDO>>>>>>>>>>>>>>")
//   console.log(" ")
// }else{
  console.log('Incoming webhook: ' + JSON.stringify(request));
  console.log("<<<<<<<<<<<<<MENSAJE RECIBIDO>>>>>>>>>>>>>>")
  console.log(" ")
// }
  // console.log('Descripcion contacto: ' + JSON.stringify(request.body.entry[0].changes[0].value.contacts[0].profile.name))
  // console.log('Numero: ' + JSON.stringify(request.body.entry[0].changes[0].value.messages[0].from))
  // console.log('Mensaje: ' + JSON.stringify(request.body.entry[0].changes[0].value.messages[0].text.body))
  // console.log("<<<<<<<<<<<<<MENSAJE RECIBIDO>>>>>>>>>>>>>>")
  // console.log(" ")
  // console.log('Incoming webhook: ' + JSON.stringify(request.body));
  response.sendStatus(200);
});

var listener = app.listen(process.env.PORT, function () {
  console.log('tu app esta corriendo en el puerto: ' + listener.address().port);
});