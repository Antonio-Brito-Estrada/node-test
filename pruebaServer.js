
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
  // console.log('Incoming webhook: ' + JSON.stringify(request.body));
  console.log(" ")
  if(request.body.entry[0].changes[0].value.statuses){
    console.log('Estatus: ' + JSON.stringify(request.body.entry[0].changes[0].value.statuses[0].status));
    console.log('Numero: ' + JSON.stringify(request.body.entry[0].changes[0].value.statuses[0].recipient_id));
    console.log('idMensaje: ' + JSON.stringify(request.body.entry[0].changes[0].value.statuses[0].id));
    // Insertar en collecion de statusMensaje
  }else{
    console.log('Descripcion contacto: ' + JSON.stringify(request.body.entry[0].changes[0].value.contacts[0].profile.name))
    console.log('Numero: ' + JSON.stringify(request.body.entry[0].changes[0].value.contacts[0].wa_id))
    if(request.body.entry[0].changes[0].value.messages[0].type === "text"){
      // console.log('Numero: ' + JSON.stringify(request.body.entry[0].changes[0].value.messages[0].from))
      console.log('Mensaje: ' + JSON.stringify(request.body.entry[0].changes[0].value.messages[0].text.body))
      console.log('idMensaje: ' + JSON.stringify(request.body.entry[0].changes[0].value.messages[0].id))
    }else{
      // console.log('contacto: ' + JSON.stringify(request.body.entry[0].changes[0].value.contacts[0]))
      console.log('idMensaje: ' + JSON.stringify(request.body.entry[0].changes[0].value.messages[0].id))
      console.log('Tipo mensaje: ' + JSON.stringify(request.body.entry[0].changes[0].value.messages[0].type))
      if(request.body.entry[0].changes[0].value.messages[0].type === "image"){
        console.log('Extension: ' + JSON.stringify(request.body.entry[0].changes[0].value.messages[0].image.mime_type))
        console.log('idDescarga: ' + JSON.stringify(request.body.entry[0].changes[0].value.messages[0].image.id))
      }else{
        console.log('Nombre archivo: ' + JSON.stringify(request.body.entry[0].changes[0].value.messages[0].document.filename))
        console.log('Extension: ' + JSON.stringify(request.body.entry[0].changes[0].value.messages[0].document.mime_type))
        console.log('idDescarga: ' + JSON.stringify(request.body.entry[0].changes[0].value.messages[0].document.id))
      }

    }
  // Insertar en collecion de mensaje
  }
  console.log("<<<<<<<<<<<<<Notificacion>>>>>>>>>>>>>>")
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