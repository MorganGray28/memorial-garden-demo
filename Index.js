require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const basicAuth = require('express-basic-auth');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const path = require('path');
const PORT = process.env.PORT || 5000;

//TODO: Set up Airtable API and connect to our demo database


// Middleware:
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'client/build')));


app.get('/', (req, res) => {
  res.send('hello world');
});

app.listen(PORT, () => {
  console.log(`Example server running on port ${PORT}`);
});