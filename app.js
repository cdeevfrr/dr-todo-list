import express from 'express';
 
const app = express();

const {Datastore} = require('@google-cloud/datastore');

const datastore = new Datastore();

app.get('/', async (req, res) => {
    await datastore.save({
      key: datastore.key('testObject', 1),
      data: {count: 1}
    })
    const query = datastore.createQuery('testObject')
    const [result] = await datastore.runQuery(query)
    res.status(200).send(`${result}`).end();
});
 
// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});