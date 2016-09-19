const config = require('config'),
    express = require('express'),
    bodyParser = require('body-parser'),
    firebase = require('firebase'),
    app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

firebase.initializeApp({
  databaseURL: config.get('db.url')
});

var router = require('./router');
router.start(app);

app.listen(config.get('General.port'), function () {
  console.log('Example app listening on port 3000!');
});
