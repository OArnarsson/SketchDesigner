global.rootRequire = function(name) {
    return require('../../FrontEnd/node_modules' + '/' + name);
}

const express = rootRequire('express');
const router = express.Router();
const _ = rootRequire("lodash");
const mongoose = rootRequire('mongoose');

// Set up mongoose
var uri = 'mongodb://Onri:PeppTaco@ds149577.mlab.com:49577/sketchdesigner'
mongoDB = mongoose.connect(uri);
Schema = mongoose.Schema;

var bingo = [{
  "userId": 1,
  "id": 1,
  "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
  "body": "quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto"
}, {
  "userId": 23,
  "id": 32,
  "title": "WADUP MEN!!!!! at provident occaecati excepturi optio reprehenderit",
  "body": "MUAHHAHAHAH recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto"
}];

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});

router.get('/designs', (req, res) => {
  res.send(bingo);
});

router.get('/templates', (req, res) => {
  res.send(bingo);
});

module.exports = router;