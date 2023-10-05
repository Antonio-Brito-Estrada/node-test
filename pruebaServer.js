var express = require('express')
    ,bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get(`/`, (req, res) => {
  console.log("entra a la barra /")
  return res.json({ message: `API DEPLOY SUCCESS` });
});

app.get("/test", function (request, response) {
  console.log("entra a la barra /test")
  response.send('Prueba Local WhatsApp Webhook ');
});

app.get('/webhook', function(req, res) {
  if (
    req.query['hub.mode'] == 'subscribe' &&
    req.query['hub.verify_token'] == 'pruebaHDE'
  ) {
    res.send(req.query['hub.challenge']);
  } else {
    res.sendStatus(400);
  }
});

app.post("/webhook", function (request, response) {
  console.log('Incoming webhook: ' + JSON.stringify(request.body));
  response.sendStatus(200);
});

var listener = app.listen(3001, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});