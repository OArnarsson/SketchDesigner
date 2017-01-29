const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const api = require('./routes/api');
const app = express();

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: false, limit: '5mb' }));

// Set API routes
app.use('/api', api);

// All other routes return the index file
app.get('*', (req, res) => {
    res.sendFile('/public/index.html', { root: './' });
});

// Server setup
const port = process.env.PORT || '3000';
app.set('port', port);
const server = http.createServer(app);
server.listen(port, () => console.log(`API running on localhost:${port}`));