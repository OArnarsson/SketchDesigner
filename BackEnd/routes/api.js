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
var data = {"data":[{"class":"mobile","canvasWidth":248.4,"canvasHeight":441.6,"allDrawings":[{"gui":{"strokeStyle":"#000","lineCap":"round","lineJoin":"round","lineWidth":5,"tool":"pen","opacity":100,"hasFill":false,"hasBorder":true,"fillStyle":"#fff","fonty":{"fontSize":30,"allFonts":["Arial","Arial Black","Comic Sans MS","Impact","Lucida Sans Unicode","Tahoma","Titillium Web","Trebuchet MS","Verdana"],"font":"Titillium Web","italic":false,"bold":false}},"tool":"pen","posX":[176,162,161,154,126,118,108,77,74,71,66,63,61,57,55,54,51,49,48,48,47,47,47,47,47,47,47,49,50,52,53,55,56,59,63,66,73,77,81,100,114,116,120,128,132,136,139,142,145,150,156,158,165,168,169,174,175,179,180,181,183,184,185,185,186,187,187,187,187,187,187,187,186,186,185,183,183,181,180,177,175,172,170,168,166,164,162,161,160,159,158,155,153,152,150,149,149,149,149,149,149,149,149,149,149,149,149,149,149,149,149,149,149,150,150,151,151,151,151,151,151,152,152,152,153,153,154,155,155,155,157,157,157,158,159,159,159,160,161,161,161,162,162,162,163,163,164,164,165,166,166,166,167,167,167,168,168,168,168,169,169,169,170,170,170,171,171,172,172,170,160,158,157,156,153,151,150,149,148,146,145,143,142,141,139,138,137,136,136,135,134,133,132,132,132,132,131,131,131,130,130,130,130,129,129,128,128,128,128,127,127,127,125,125,125,125,124,124,124,124,123,123,122,122,122,122,122,122,121,121,121,120,120,120,120,120,120,120,120,119,118,118,118,118,118,118,117,117,116,116,116,116,116,115,115,114,114,113,113,113,113,112,112,112,111,110,110,110,109,109,108,108],"posY":[37,42,42,46,60,64,68,83,84,86,89,91,92,95,97,97,99,101,103,105,106,107,108,109,110,111,112,113,114,115,116,116,116,118,119,120,122,122,122,124,126,126,126,128,128,128,128,128,129,129,129,129,130,131,131,131,131,132,132,133,133,133,133,134,134,134,135,136,137,138,139,143,144,145,147,147,149,150,151,153,154,155,157,157,158,160,160,160,160,160,160,162,162,162,162,162,163,164,166,167,168,169,172,173,174,177,178,179,180,181,183,184,186,187,188,191,192,193,194,196,198,199,202,203,207,209,210,214,218,219,224,226,229,231,234,238,239,240,242,246,248,251,252,254,255,256,259,264,266,270,271,274,275,276,278,280,282,284,285,285,286,287,289,290,292,292,293,293,294,296,301,301,303,303,304,305,305,306,306,307,308,308,309,310,310,311,311,312,313,313,314,314,314,313,312,311,309,308,307,307,305,304,303,302,301,300,299,298,297,295,294,293,291,289,288,286,285,284,283,282,280,279,278,277,275,274,273,272,269,267,266,264,263,261,260,258,256,255,253,249,247,246,244,243,241,240,236,233,232,231,230,228,227,226,224,223,222,220,219,218,217,216,215,214,214,212,211,210,209,208,208,207],"moveXby":0,"moveYby":0,"value":"","found":false,"selection":{"buffer":10,"lowX":37,"highX":197,"lowY":27,"highY":324},"startX":47,"startY":37,"endX":187,"endY":314}]},{"class":"mobile","canvasWidth":248.4,"canvasHeight":441.6,"allDrawings":[{"gui":{"strokeStyle":"#000","lineCap":"round","lineJoin":"round","lineWidth":5,"tool":"pen","opacity":100,"hasFill":false,"hasBorder":true,"fillStyle":"#fff","fonty":{"fontSize":30,"allFonts":["Arial","Arial Black","Comic Sans MS","Impact","Lucida Sans Unicode","Tahoma","Titillium Web","Trebuchet MS","Verdana"],"font":"Titillium Web","italic":false,"bold":false}},"tool":"pen","posX":[134,134,134,134,134,134,134,134,134,134,134,131,131,130,129,128,127,126,125,124,123,122,121,120,119,117,116,113,109,107,106,103,101,101,98,95,94,91,86,85,82,79,75,70,64,59,49,48,43,39,38,36,35,35,34,33,32,32,32,32,32,32,32,32,32,32,32,34,36,36,38,40,41,42,45,49,53,55,59,62,65,67,69,73,76,80,82,86,92,93,95,97,100,102,105,107,110,113,114,116,116,118,118,119,121,122,124,125,126,127,128,129,131,131,132,132,133,134,134,134,134,135,135,136,136,137,137,138,139,139,139,139,139,139,139,139,140,140,140,140,140,140,140,140,138,138,136,135,134,133,132,131,124,123,122,120,119,117,113,112,110,108,107,102,101,99,98,97,91,90,89,88,82,81,81,80,77,77,76,76,76,76,76,76,76,77,79,79,85,87,89,91,93,95,97,99,101,104,109,112,118,122,129,130,133,136,141,144,146,149,151,153,154,157,161,162,165,167,170,170,172,173,176,176,178,179,181,181,185,187,187,190,190,191,192,194,195,197,197,197,198,199,199,200,200,200,201,201,201,201,201,201,201,201,201,200,200,199,196,194,193,192,191,190,188,186,185,183,181,179,178,177,176,175,173,169,167,163,162,158,154,154,153,150,148,147,144,143,140,138,137,135,134,134,134,134,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,134,135,135,135,136,136,137,138,139,141,141,144,146,147,148,151,151,153,154,156,159,160,161,163,166,167,170,171,172,174,175,176,177,179,180,181,182,182,182,183,184,184,184,184,184,185,185,185,185,185,185,185,185,185,185,185,185,185,185,184,183,182,180,179,176,175,174,173,171,170,168,166,165,164,163,162,161,159,157,156,155,153,152,151,150,149,148,148,145,144,142,141,139,138,136,134,133,131,129,128,126,125,124,122,121,120,120,117,116,115,114,113,112,112,112,112,112,111,111,111,111,111,111,111,111,111,111,111,112,113,113,114,114,115,116,117,119,119,121,121,123,123,125,125,126,127,128,128,128,128,128,128,127,126,126,125,125,125,124,123,122,121,121,119,118,117,116,115,114,111,110,109,108,107,106,105,104,101,99,97,95,93,92,89,86,85,83,81,80,78,74,73,69,68,66,64,62,61,58,57,56,54,53,52,51,49,48,47,46,46,47,49,51,52,56,58,60,62,66,69,71,72,75,78,80,81,83,84,86,87,90,93,94,95,97,98,98,99,100,101,100,100,99,99,97,96,95,93,92,91,91,90,89,88,87,87,85,85,84,84,83,82,82,82,81,81,80,80,81,84,85,87,88,89,91,94,96,97,99,100,102,104,107,108,110,114,115,119,123,127,131,134,137,141,147,150,151,152,158,161,163,164,169,172,174,176,177,177,178,180,181,182,183,183,184,184,184,184,184,184,184,184,184,185,185,185,185,186,186,187,188,188,189,190,190,190,192,193,194,195,194,193,192,191,189,188,186,185,184,183,181,180,179,178,176,175,174,173,172],"posY":[273,283,287,290,292,294,296,298,300,302,303,311,312,313,314,314,315,315,315,315,315,315,315,315,315,314,313,312,309,307,306,303,303,302,300,297,296,294,291,290,287,284,281,278,273,268,260,259,254,248,246,242,240,238,238,233,232,228,224,222,219,218,217,213,211,207,205,203,200,196,194,191,190,189,185,180,175,173,171,166,164,162,160,157,155,152,150,148,144,144,142,141,139,137,137,136,134,133,132,132,131,131,130,130,129,129,129,129,129,129,129,129,129,130,131,132,134,136,137,138,139,140,143,144,145,147,148,153,156,158,159,162,164,167,168,172,179,184,189,195,199,200,203,215,222,223,226,232,234,236,237,239,247,248,249,250,250,252,254,254,254,254,254,254,254,254,253,253,249,249,247,247,239,237,236,234,225,224,221,217,216,213,212,203,202,198,195,194,185,184,181,180,178,176,175,173,171,169,166,164,161,158,155,155,154,153,152,151,151,151,151,150,150,150,150,150,151,151,152,153,154,154,156,157,157,159,159,161,164,165,166,169,170,171,174,176,178,180,183,184,186,188,190,192,194,196,197,201,203,205,207,211,213,214,218,222,223,226,230,233,234,237,237,238,241,242,243,244,245,246,247,248,248,249,250,251,251,253,253,254,254,255,255,255,255,255,255,256,256,256,256,256,255,253,252,251,248,246,242,240,236,235,233,230,228,225,222,220,219,215,214,210,209,207,205,204,202,199,196,195,194,193,191,190,188,186,185,183,180,178,178,176,175,174,173,172,171,169,169,169,168,167,166,166,165,165,164,164,164,164,164,164,164,164,165,166,167,168,169,171,172,173,175,178,181,183,185,188,191,193,194,196,199,202,210,211,214,217,220,222,225,230,230,231,233,233,235,236,237,238,238,238,239,239,239,239,239,239,239,239,239,239,239,238,237,236,235,234,233,231,230,229,227,226,223,223,221,219,217,217,214,213,210,209,205,203,201,198,195,190,188,186,184,182,180,177,176,174,169,164,163,157,155,152,148,143,141,136,135,134,129,128,122,119,117,114,113,109,107,104,103,100,97,90,89,86,82,79,76,75,74,73,73,72,71,70,70,69,68,67,67,66,66,65,64,64,62,62,61,61,61,61,60,60,60,60,59,59,58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,55,54,53,51,50,47,46,44,43,42,40,39,38,36,33,32,31,30,29,27,26,25,23,22,21,20,19,18,18,18,17,17,19,19,20,21,24,25,28,28,31,32,35,36,37,42,43,46,49,52,54,58,60,64,66,68,69,74,79,103,110,111,113,114,116,117,119,119,120,121,121,121,122,123,123,123,123,123,123,123,123,123,123,123,122,121,120,119,119,116,116,115,114,112,109,108,105,105,104,103,101,99,98,96,95,93,92,90,89,88,87,86,85,84,84,83,82,81,81,80,80,80,79,79,79,78,77,77,77,76,76,76,76,76,76,76,77,77,77,78,78,78,79,79,79,80,80,80,80,80],"moveXby":0,"moveYby":0,"value":"","found":false,"selection":{"buffer":10,"lowX":22,"highX":211,"lowY":7,"highY":325},"startX":32,"startY":17,"endX":201,"endY":315}]}]};


/* GET api listing. */
router.get('/', (req, res) => {
  res.json('api works');
});

router.get('/designs', (req,res) => {
  res.json(data);
});

router.get('/templates', (req, res) => {
  res.json(bingo);
});

module.exports = router;