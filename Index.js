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
const base = Airtable.base(process.env.AIRTABLE_BASE);
app.use(cookieParser(process.env.AUTH_RANDOM_KEY));
const auth = (basicAuth({
  users: { 'admin': 'password' }
}));


// Middleware:
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'client/build')));

// TODO: Finish setting up routes 
// Routes:
app.get('/', (req,res) =>{
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

app.get('/authenticate', auth, (req, res) => {
  const options = {
      httpOnly: true,
      signed: true,
      maxAge: 1000 * 60 * 60 * 24 * 2
  }
  if (req.auth.user === 'admin') {
      res.cookie('name', 'admin', options).send({ screen: 'admin' });
  }
});

app.get('/read-cookie', (req, res) => {
  if (req.signedCookies.name === 'admin') {
    res.send({ screen: 'admin' });
  } else {
    res.send({ screen: 'auth' });
  }
});

app.get('/clear-cookie', (req, res) => {
  res.clearCookie('name').end();
});

app.listen(PORT, () => {
  console.log(`Example server running on port ${PORT}`);
});