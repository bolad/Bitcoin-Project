const express = require('express');
const bodyParser = require('body-parser');
const Blockchain = require('../blockchain');
const P2pServer = require(('./p2p-server'));

const HTTP_PORT = process.env.HTTP_PORT || 3001;

//call the default express function and assign it to app
const app = express();

const bc = new Blockchain();

const p2pServer = new P2pServer(bc);

/*
To use the body parser json middleware function, we use app.use() function. This will
allow us to receive json within post requests
*/
app.use(bodyParser.json());

/*
Add the first end point for our API that interacts with the blockchain instance(bc).
Define a get request using the get function with the first parameter being end point
that we want our API to expose and the second paramer the error function definition.
For this function we'll return the blocks in the current blockchain
*/
app.get('/blocks', (request, response) => {

  //send a JSON object back to the user
  response.json(bc.chain);
});

//Allows users to add data to the blockchain
app.post('/mine', (request, response) => {
const block = bc.addBlock(request.body.data);
console.log(`New block added: ${block.toString()}`);

//Respond with updated chain of blocks which includes user's new blocks
response.redirect('/blocks');
});
/*
Make sure your application is running using app.listen() and add two scripts to the package.json
file which will allow us to start the API up.
*/
app.listen(HTTP_PORT, () => console.log(`Listening on port ${HTTP_PORT}`));
p2pServer.listen();
