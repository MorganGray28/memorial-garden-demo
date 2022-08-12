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

app.get('/plots', (req, res) => {
  if(req.signedCookies.name !== 'admin') {
      res.end();
  }
  let results = retrieveAllPlots();
  results
      .then(data => {
          res.send(data);
      })
      .catch(err => {
          console.log(err);
      });
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

// Get Plot Data
function retrieveAllPlots() {
  let allRecords = [];
  const getPlots = new Promise((resolve, reject) => {
      base('Table 1').select({
          // Selecting the first 3 records in Grid view:
          view: "Grid view",
          sort: [{field: 'headstone', direction: 'asc'}]
      }).eachPage(function page(records, fetchNextPage) {
          // This function (`page`) will get called for each page of records.
      
          records.forEach(function(record) {
              // console.log('Retrieved', record.get('location'));
              allRecords.push(record);
          });
      
          // To fetch the next page of records, call `fetchNextPage`.
          // If there are more records, `page` will get called again.
          // If there are no more records, `done` will get called.
          fetchNextPage();
      
      }, function done(err) {
          resolve(allRecords);
          if (err) { reject(err);}
      });
  });
  return getPlots;
}

function retrievePlot(id, updates) {
  const plot = new Promise ((resolve, reject) => {
      base('Table 1').update(id, updates, function(err, record) {
          if (err) {
            console.error(err); reject(err);
          }
          resolve(record)
        });
      });

  return plot;
}

app.listen(PORT, () => {
  console.log(`Example server running on port ${PORT}`);
});