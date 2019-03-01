const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.get('/users', (req, res) => {
  res.send("");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Listening on ' + PORT));
