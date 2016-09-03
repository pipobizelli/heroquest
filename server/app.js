var express = require('express');
var firebase = require('firebase');
var app = express();


firebase.initializeApp({
  databaseURL: "https://heroquest-ca81f.firebaseio.com"
});
var db = firebase.database();


// Create Session
app.post('/session', function(req, res) {
  console.log('Creating session...');
  var pushref = db.ref('/').child('sessions').push();
  pushref.set({
    "_setup": {
      "created_at": (new Date()).toString()
    }
  });
  res.send(pushref.key);
});


app.get('/session/connect', function (req, res) {
  res.send('Conecting to session...');
});

app.get('/session/join', function(req, res) {
  var max_slots = 2;

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
