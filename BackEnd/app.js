const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const api = require('./routes/api');
const app = express();
const cors = require("cors");

app.use(cors());
// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('../FrontEnd/dist'));

// Set API routes
app.use('/api', api);

// All other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile('FrontEnd/dist/index.html', { root: '../' });
});

// Server setup
const port = process.env.PORT || '3000';
app.set('port', port);
const server = http.createServer(app);
server.listen(port, () => console.log(`API running on localhost:${port}`));