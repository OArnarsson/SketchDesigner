global.rootRequire = function(name) {
    return require('../../FrontEnd/node_modules' + '/' + name);
}

const express = rootRequire('express');
const router = express.Router();
const _ = rootRequire("lodash");
const mongoose = rootRequire('mongoose');
const Rx = rootRequire('RxJS')
const Design = require('../models/designs');
let uri = 'mongodb://Onri:PeppTaco@ds149577.mlab.com:49577/sketchdesigner'
mongoDB = mongoose.connect(uri);

let bingo = {
    "data": {
      "title": "Bingo",
      "dateCreated": "19.01.2017 12:47:00",
      "dateModified": "19.01.2017 12:47:00",
      "canvasArr": [{
        "class": "mobile",
        "canvasWidth": 248.4,
        "canvasHeight": 441.6,
        "allDrawings": [{
          "gui": {
            "strokeStyle": "#000",
            "lineCap": "round",
            "lineJoin": "round",
            "lineWidth": 5,
            "tool": "pen",
            "opacity": 100,
            "hasFill": false,
            "hasBorder": true,
            "fillStyle": "#fff",
            "fonty": {
              "fontSize": 30,
              "allFonts": ["Arial", "Arial Black", "Comic Sans MS", "Impact", "Lucida Sans Unicode", "Tahoma", "Titillium Web", "Trebuchet MS", "Verdana"],
              "font": "Titillium Web",
              "italic": false,
              "bold": false
            }
          },
          "tool": "pen",
          "posX": [143, 143, 143, 142, 142, 141, 141, 140, 139, 138, 138, 136, 135, 134, 134, 133, 132, 131, 130, 128, 126, 125, 123, 121, 120, 117, 115, 114, 113, 111, 111, 110, 108, 106, 105, 104, 102, 102, 100, 100, 98, 98, 96, 93, 92, 91, 89, 88, 85, 84, 83, 81, 81, 80, 79, 77, 77, 77, 77, 76, 76, 76, 75, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 75, 75, 76, 76, 76, 77, 78, 78, 79, 80, 81, 82, 83, 84, 85, 86, 88, 89, 89, 92, 92, 93, 96, 96, 98, 99, 100, 103, 104, 105, 108, 108, 109, 110, 112, 113, 114, 114, 116, 118, 118, 119, 119, 120, 120, 120, 120, 120, 121, 121, 122, 122, 122, 122, 123, 123, 123, 123, 123, 124, 124, 125, 125, 126, 126, 126, 127, 127, 127, 128, 128, 128, 128, 128, 129, 129, 129, 129, 130, 130, 130, 130, 131, 131, 131, 131, 131, 131, 131, 131, 131, 131, 131, 131, 131, 131, 131, 130, 129, 129, 128, 128, 126, 126, 125, 124, 124, 123, 122, 122, 121, 120, 119, 118, 118, 116, 115, 114, 109, 108, 107, 106, 105, 105, 104, 104, 103, 102, 102, 101, 101, 100, 100, 100, 99, 97, 97, 96, 96, 94, 93, 92, 92, 90, 89, 89, 88, 88, 86, 86, 85, 85, 83, 83, 83, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 83, 83, 84, 85, 85, 85, 86, 86, 86, 86, 87, 87, 87, 87, 87],
          "posY": [59, 58, 57, 57, 56, 55, 55, 54, 53, 52, 52, 51, 51, 51, 51, 50, 49, 49, 49, 48, 48, 48, 48, 48, 47, 47, 47, 47, 47, 47, 47, 47, 48, 48, 49, 49, 50, 50, 51, 52, 53, 53, 55, 58, 59, 61, 63, 63, 66, 68, 70, 72, 73, 74, 77, 80, 81, 83, 84, 86, 88, 90, 91, 93, 94, 95, 95, 97, 99, 101, 102, 104, 105, 106, 108, 108, 110, 110, 110, 112, 112, 113, 113, 114, 116, 116, 117, 118, 119, 120, 120, 120, 121, 122, 122, 123, 124, 125, 125, 125, 126, 126, 127, 127, 127, 128, 129, 129, 130, 130, 130, 130, 131, 132, 132, 132, 132, 133, 134, 134, 134, 134, 135, 136, 136, 137, 137, 137, 138, 138, 140, 141, 141, 142, 143, 144, 144, 148, 149, 152, 152, 154, 155, 158, 158, 159, 162, 163, 164, 164, 166, 166, 170, 172, 174, 175, 177, 179, 180, 181, 184, 186, 189, 190, 190, 193, 195, 197, 198, 201, 202, 203, 206, 207, 210, 212, 214, 215, 218, 220, 221, 223, 225, 226, 227, 228, 230, 230, 231, 231, 233, 234, 235, 236, 236, 238, 241, 242, 242, 243, 243, 243, 243, 243, 243, 243, 243, 243, 243, 242, 242, 241, 241, 238, 238, 237, 237, 234, 233, 232, 231, 229, 227, 227, 226, 225, 222, 222, 220, 219, 216, 215, 215, 213, 212, 212, 211, 211, 210, 208, 208, 207, 205, 204, 203, 202, 202, 199, 198, 198, 197, 194, 193, 192, 192, 190, 189, 188, 188, 187, 186, 186, 184, 184],
          "moveXby": 0,
          "moveYby": 0,
          "value": "",
          "found": false,
          "selection": {
            "buffer": 10,
            "lowX": 64,
            "highX": 153,
            "lowY": 37,
            "highY": 253
          },
          "startX": 74,
          "startY": 47,
          "endX": 143,
          "endY": 243
        }, {
          "gui": {
            "strokeStyle": "#000",
            "lineCap": "round",
            "lineJoin": "round",
            "lineWidth": 5,
            "tool": "square",
            "opacity": 100,
            "hasFill": false,
            "hasBorder": true,
            "fillStyle": "#fff",
            "fonty": {
              "fontSize": 30,
              "allFonts": ["Arial", "Arial Black", "Comic Sans MS", "Impact", "Lucida Sans Unicode", "Tahoma", "Titillium Web", "Trebuchet MS", "Verdana"],
              "font": "Titillium Web",
              "italic": false,
              "bold": false
            }
          },
          "tool": "square",
          "posX": [],
          "posY": [],
          "moveXby": 0,
          "moveYby": 0,
          "value": "",
          "found": false,
          "selection": {
            "buffer": 10,
            "lowX": 35,
            "highX": 144,
            "lowY": 118,
            "highY": 233
          },
          "startX": 45,
          "startY": 128,
          "endX": 89,
          "endY": 95
        }]
      }, {
        "class": "mobile",
        "canvasWidth": 248.4,
        "canvasHeight": 441.6,
        "allDrawings": [{
          "gui": {
            "strokeStyle": "#000",
            "lineCap": "round",
            "lineJoin": "round",
            "lineWidth": 5,
            "tool": "square",
            "opacity": 100,
            "hasFill": false,
            "hasBorder": true,
            "fillStyle": "#fff",
            "fonty": {
              "fontSize": 30,
              "allFonts": ["Arial", "Arial Black", "Comic Sans MS", "Impact", "Lucida Sans Unicode", "Tahoma", "Titillium Web", "Trebuchet MS", "Verdana"],
              "font": "Titillium Web",
              "italic": false,
              "bold": false
            }
          },
          "tool": "square",
          "posX": [],
          "posY": [],
          "moveXby": 0,
          "moveYby": 0,
          "value": "",
          "found": false,
          "selection": {
            "buffer": 10,
            "lowX": 25,
            "highX": 129,
            "lowY": 104,
            "highY": 282
          },
          "startX": 35,
          "startY": 114,
          "endX": 84,
          "endY": 158
        }, {
          "gui": {
            "strokeStyle": "#000",
            "lineCap": "round",
            "lineJoin": "round",
            "lineWidth": 5,
            "tool": "square",
            "opacity": 100,
            "hasFill": true,
            "hasBorder": true,
            "fillStyle": "#f81b1b",
            "fonty": {
              "fontSize": 30,
              "allFonts": ["Arial", "Arial Black", "Comic Sans MS", "Impact", "Lucida Sans Unicode", "Tahoma", "Titillium Web", "Trebuchet MS", "Verdana"],
              "font": "Titillium Web",
              "italic": false,
              "bold": false
            }
          },
          "tool": "square",
          "posX": [],
          "posY": [],
          "moveXby": 0,
          "moveYby": 0,
          "value": "",
          "found": false,
          "selection": {
            "buffer": 10,
            "lowX": 69,
            "highX": 176,
            "lowY": 9,
            "highY": 92
          },
          "startX": 79,
          "startY": 19,
          "endX": 87,
          "endY": 63
        }]
      }]
    }
  };

router.use(function(req, res, next) {
    console.log('Request being handled');
    next(); 
});

router.get('/', (req, res) => {
  res.send('API is live!');
});


// Designs routes
router.route('/designs')
  .post((req, res) => {
    let design = new Design();
    design.title = req.body['data']['title'];
    design.dateCreated = req.body['data']['dateCreated'];
    design.dateModified = req.body['data']['dateModified'];
    design.canvasArr = req.body['data']['canvasArr'];

    design.save((err) => {
      if(err)
        res.send(err);
      res.json({ log: 'Design saved to db'});  
    });
  })

  .get((req, res) => {
    Design.find((err, designs) => {
      if(err)
        res.send(err);

      res.json(designs);
    });
  });


// Designs/ID routes
router.route('/designs/:dateCreated')
  .get((req, res) => {
    Design.findOne({dateCreated: req.params.dateCreated}, (err, design) => {
      if (err)
        res.send(err);
      
      res.json(design);
    });
  })

  .put((req, res) => {
    console.log(req.params);
    Design.findOne({dateCreated: req.body['data']['dateCreated']}, (err, design) => {
      if (err)
        res.send(err);
      design.title = req.body['data']['title'];
      design.dateCreated = req.body['data']['dateCreated'];
      design.dateModified = req.body['data']['dateModified'];
      design.canvasArr = req.body['data']['canvasArr'];
      design.save(function(err) {
        if (err)
          res.send(err);
        res.json({ message: 'design Design!' });
      });
    });
  })

  .delete(function(req, res) {
    Design.remove({dateCreated: req.body['data']['dateCreated']}, function(err, design) {
      if (err)
        res.send(err);

      res.json({ message: 'Successfully deleted' });
    });
  });

module.exports = router;