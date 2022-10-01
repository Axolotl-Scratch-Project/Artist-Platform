const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('../models/database');


const app = express();
app.use(cors());
app.use(bodyParser.json());
const port = process.env.PORT || 3000;

console.log("hello world");

const testFunction = async () => {
  const add = `INSERT INTO users (name, email, password, location) VALUES ('Yirou', 'yirou@gmail.com', '6789', 'new york city')`
  await db.query(add)
  console.log('textFunction executed')
}
testFunction();





app.get('/', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../client/index.html'));
});





app.listen(port, console.log(`Listening on port ${port}`));