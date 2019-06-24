const express = require('express');
const Blockchain = require('../blockchain');
const HTTP_PORT = process.env.HTTP_PORT || 3001;

//call the default express function and assign it to app
const app = express();
const bc = new Blockchain();

/*
Add the first end point for our API that interacts with the blockchain instance(bc).
Define a get request using the get function with the first parameter being end point
that we want our API to expose and the secomd paramer the error function definition.
For this function we'll return the blocks in the current blockchain
*/
app.get('/blocks', (request, response) => {

  //send a JSON object back to the user
  response.json(bc.chain);
});

/*
Make sure your application is running using app.listen() and add two scripts to the package.json
file which will allow us to start the API up.
*/
app.listen(HTTP_PORT, () => console.log(`Listening on port ${HTTP_PORT}`));
