const config = require('config'),
    express = require('express'),
    bodyParser = require('body-parser'),
    firebase = require('firebase'),
    app = express();

// AppModel = require('models/app_model');
//
// let IteratorAdapter = require('models/model_adapters/iterator');
// let FirebaseAdapter = require('models/model_adapters/firebase');
//
// AppModel.use_adapter(IteratorAdapter);
// AppModel.use_adapter(FirebaseAdapter);

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
