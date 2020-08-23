const express = require('express');
const app = express();
const pug = require('pug');
const bodyParser = require('body-parser')

const db = require('./database')
const schema = require('./schema')
const { ValidationError } = require('./shared')

// https://expressjs.com/en/guide/using-template-engines.html
app.set('view engine', 'pug')
app.set('views', './views')

// parses the post bodies which are url-encoded by default
app.use(bodyParser.urlencoded({
  extended: false,
  type: 'application/x-www-form-urlencoded'
}))

// Report all errors directly to the user rather than keeping them silent.
app.use(async function (req, res, next) {
  try{
    await next()
  } catch(e){
    res.status(200).send(`Error: ${e}`).end()
  }
})

app.get('/', async (req, res) => {
  res.render('mainPage')
});

for (const tableName in schema){
  app.post(`/create${tableName}` , async (req, res) => {
    console.log(req.body)
    try {
      // Validations are currently only on the db level for simplicity. An optimization is to validate on the javascript level.
      await db.saveRecord({type: tableName, data: req.body})
      res.status(200).send(`saved a new ${tableName}!`).end()
    } catch (error) {
      if (error instanceof ValidationError){
        res.render('createObject', {objectType: tableName, objectData: req.body, shape: schema[tableName], errors: error.errors})
      } else {
        throw error // this will be caught by our catch-all
      }
    }
  });
  app.get(`/create${tableName}` , async (req, res) => {

    res.render('createObject', {objectType: tableName, objectData: {}, shape: schema[tableName], errors: {}})
  });
}

app.get(`/listTasks`, async (req, res) => {
  // Get the first n tasks sorted by something
  res.render('listView', {objectType: 'madeUp', objects: [{a:1, b:2, id:0}, {a:5, b:6, id:1}], objectKeys: ['a', 'b']})
})
 
// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});