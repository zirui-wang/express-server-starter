'use strict';

const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

// Express will serve up production assests
// like our main.js file, or main.css file.
app.use(express.static('client'));

// Parse imcoming request bodies and enable req.body.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// CORS.
app.use(cors());

app.use('/api', require('./routes')(app));

app.get('/socketio', function(req, res) {
  const path = require('path');
  res.sendFile(path.resolve(__dirname, 'client', 'index.html'));
});

// EventSource
app.get('/eventsource', function(req, res) {
  res.writeHead(200, {
    Connection: 'keep-alive',
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache'
  });

  const data = 'Welcome to use EventSource';

  setInterval(() => {
    console.log('writing ' + testdata);
    res.write('data: ' + JSON.stringify({ msg: data }) + '\n\n');
  }, 1000);
});

// socket.io
const server = require('http').createServer(app);
const io = require('socket.io')(server);

io.on('connection', function(socket) {
  socket.on('chat message', function(msg) {
    io.emit('chat message', msg);
  });
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log('Listening on ' + PORT));
