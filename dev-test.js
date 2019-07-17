// This file will be used to explore the Block class

const Blockchain = require('./blockchain');

const bc = new Blockchain();

for (let i=0; i<10; i++){
  console.log(bc.addBlock(`foo ${i}`).toString());
}
