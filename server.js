const dotenv = require('dotenv');
const express = require('express');
const path = require('path');
const compression = require('compression');

dotenv.config('./env');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(compression());

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, (err) => {
  if (err) throw err;

  console.log('> Server started');
});
