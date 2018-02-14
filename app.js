const express = require('express');
const app = express();
const port = process.env.NODE_ENV === 'development' ? 3000 : process.env.PORT;
const path = require('path');

app.get('/', function (req, res) {
  res.sendFile(path.resolve(__dirname, './index.html'));
});
app.listen(port, function () {
  console.log('Example app listening on port 3000!');
});