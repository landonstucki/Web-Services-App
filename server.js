const express = require('express');
const app = express();
const port = 3000;

const nameRoute = require('./routes');

app.use('/', nameRoute);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});