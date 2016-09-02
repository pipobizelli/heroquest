var express = require('express');
var app = express();

app.get('/session/connect', function (req, res) {
  res.send('Conecting to session...');
});

app.get('/session/join', function(req, res) {
  res.send('Checking if there are slots available...');
});

app.get('/session/ready', function(req, res) {
  res.send('Is the session ready?');
});

app.get('/session/turn', function(req, res) {
  res.send('Checking if is your turn...')
});

app.get('/session/turn/start', function(req, res) {
  res.send('Starting your turn...')
});

app.get('/session/turn/finish', function(req, res) {
  res.send('Finish your turn...')
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
