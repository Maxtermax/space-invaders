const express = require('express');
const app = express();
const PORT = process.env.NODE_ENV === 'production' ? process.env.PORT : 3000;
const path = require('path');
app.use(express.static('public'));

app.get('/', function (req, res) {
  res.sendFile(path.resolve(__dirname, './index.html'));
});

app.listen(PORT, function () {
  console.log(`App listen on: ${PORT}`);
});