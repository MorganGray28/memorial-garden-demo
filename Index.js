require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const basicAuth = require('express-basic-auth');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const path = require('path');
const PORT = process.env.PORT || 5000;
const Airtable = require('airtable');
Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: process.env.AIRTABLE_API_KEY
});
const base = Airtable.base(prcess.env.AIRTABLE_BASE);
app.use(cookieParser(process.env.AUTH_RANDOM_KEY));
app.use(basicAuth({
  users: { 'guest': 'password' }
}));


// Middleware:
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'client/build')));

// TODO: Finish setting up routes 
// Routes:
app.get('/', (req, res) => {
  res.send('hello world');
});

app.listen(PORT, () => {
  console.log(`Example server running on port ${PORT}`);
});