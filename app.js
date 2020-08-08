const express = require('express');
 
const app = express();

const {Datastore} = require('@google-cloud/datastore');

const datastore = new Datastore();

app.get('/', async (req, res) => {
  try{
    await datastore.save({
      key: datastore.key('testObject'),
      data: {count: 1}
    })
    const query = datastore.createQuery('testObject').select(['__key__'])
    const [result] = await datastore.runQuery(query)
    res.status(200).send(`${JSON.stringify(result)}`).end()
  } catch (e) {
    res.status(200).send(`Error: ${e}`).end()
  }
});
 
// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});