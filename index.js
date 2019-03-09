const app = require('express')();
const cors = require('cors');
const bodyParser = require('body-parser');

// Parse imcoming request bodies and enable req.body.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// CORS.
app.use(cors());

app.get('/users', (req, res) => {
  res.send("");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Listening on ' + PORT));
