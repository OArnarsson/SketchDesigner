global.rootRequire = (name) => {
    return require('../node_modules' + '/' + name);
}

const express = rootRequire('express');
const bodyParser = rootRequire('body-parser');
const path = require('path');
const http = require('http');
const api = require('./routes/api');
const app = express();

app.use(express.static('../dist'));

app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: false, limit: '5mb' }));

// Set API routes
app.use('/api', api);

// All other routes return the index file
app.get('*', (req, res) => {
    res.sendFile('dist/index.html', { root: '../' });
});

// Server setup
const port = process.env.PORT || '3000';
app.set('port', port);
const server = http.createServer(app);
server.listen(port, () => console.log(`API running on localhost:${port}`));