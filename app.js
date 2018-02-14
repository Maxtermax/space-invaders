const express = require('express');
const app = express();
const port = process.env.NODE_ENV === 'development' ? 3000 : process.env.PORT;

app.get('/', function (req, res) {
  res.sendFile('./index.html');
});
app.listen(port, function () {
  console.log('Example app listening on port 3000!');
});