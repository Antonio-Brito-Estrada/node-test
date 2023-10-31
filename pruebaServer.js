
var express = require('express')
    ,bodyParser = require('body-parser');
    const cors = require("cors");
    const { config } = require('dotenv');
    const axios = require('axios');

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
  console.log("Entra:::")
var data = JSON.stringify({
      "messaging_product": "whatsapp",
      "to": "523515194726",
      "type": "template",
      "template": {
        "name": "hello_world",
        "language": {
          "code": "en_US"
        }
      }
    });
    
    var config = {
      method: 'post',
      url: 'https://graph.facebook.com/v17.0/125943953940927/messages',
      headers: { 
        'Content-Type': 'application/json', 
        'Authorization': 'Bearer EAAMCICOkXOQBO6nKOpJHoXDOFtrzaAZC6H2lBVR97tqtVOthYVP1Kw5wHtZBODoX7QEW4vwcVuoP81R64Jeein5ZAIMXzLXoRTT7Pjp3N4wMYAFq11T1uToCvZC5XfUtWMHYMDu6MnbpCk5D7efR4M8oZCvSLn2F7QP0OD04NRzkqHKTwCL2IIUPXDoaJBiA2ArQJBxKfjjIL'
      },
      data : data
    };

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
      res.sendStatus(200);
})
.catch(function (error) {
  console.log(error);
      res.sendStatus(400);
});
console.log("Sale:::")
  response.send('Prueba Local WhatsApp Webhook ');
});

app.get('/webhook', function(req, res) {
  console.log("req:"+JSON.stringify(req.query))
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

  console.log(" ")
  if(request.body.entry[0].changes[0].value.statuses){

    // Insertar en collecion de statusMensaje
    console.log('Estatus: ' + JSON.stringify(request.body.entry[0].changes[0].value.statuses[0].status));
    console.log('Numero: ' + JSON.stringify(request.body.entry[0].changes[0].value.statuses[0].recipient_id));
    console.log('idMensaje: ' + JSON.stringify(request.body.entry[0].changes[0].value.statuses[0].id));
    
  }else{
    
        // Insertar en collecion de mensaje
        console.log('Descripcion contacto: ' + JSON.stringify(request.body.entry[0].changes[0].value.contacts[0].profile.name))
        console.log('Numero: ' + JSON.stringify(request.body.entry[0].changes[0].value.contacts[0].wa_id))
        if(request.body.entry[0].changes[0].value.messages[0].type === "text"){
            console.log('Mensaje: ' + JSON.stringify(request.body.entry[0].changes[0].value.messages[0].text.body))
            console.log('idMensaje: ' + JSON.stringify(request.body.entry[0].changes[0].value.messages[0].id))
        }else{
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


// prueba enviar mensaje
app.get('/enviarMensaje', function(req, res) {
console.log("Entra:::")
var data = JSON.stringify({
      "messaging_product": "whatsapp",
      "to": "523515194726",
      "type": "template",
      "template": {
        "name": "hello_world",
        "language": {
          "code": "en_US"
        }
      }
    });
    
    var config = {
      method: 'post',
      url: 'https://graph.facebook.com/v17.0/125943953940927/messages',
      headers: { 
        'Content-Type': 'application/json', 
        'Authorization': 'Bearer EAAMCICOkXOQBO6nKOpJHoXDOFtrzaAZC6H2lBVR97tqtVOthYVP1Kw5wHtZBODoX7QEW4vwcVuoP81R64Jeein5ZAIMXzLXoRTT7Pjp3N4wMYAFq11T1uToCvZC5XfUtWMHYMDu6MnbpCk5D7efR4M8oZCvSLn2F7QP0OD04NRzkqHKTwCL2IIUPXDoaJBiA2ArQJBxKfjjIL'
      },
      data : data
    };

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
      res.sendStatus(200);
})
.catch(function (error) {
  console.log(error);
      res.sendStatus(400);
});
console.log("Sale:::")
});



var listener = app.listen(process.env.PORT, function () {
  console.log('tu app esta corriendo en el puerto: ' + listener.address().port);
});