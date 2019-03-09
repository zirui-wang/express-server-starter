const app = require('express')();
const cors = require('cors');
const bodyParser = require('body-parser');

// Parse imcoming request bodies and enable req.body.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// CORS.
app.use(cors());

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

const server = require('http').createServer(app);
const io = require('socket.io')(server);

io.on('connection', function(socket) {
  socket.on('chat message', function(msg) {
    io.emit('chat message', msg);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log('Listening on ' + PORT));
