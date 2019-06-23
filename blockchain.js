const Block = require('./block');

class Blockchain {
  constructor() {
    //Start the chain with values of the genesis block
    this.chain = [Block.genesis()];
  }

  addBlock(data){
    //get last element of genesis block and assign as lastBlock
    const lastBlock = this.chain[this.chain.length-1];

    //generate a new block using the mineBlock function
    const block = Block.mineBlock(lastBlock, data);

    //add new block to the end of the chain array
    this.chain.push(block);

    return block;
  }

  isValidChain(chain) {
    // check that the incoming chain starts with the proper genesis block
    //Stringify the objects and compare the two string versions
    if(JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) return false;

    // run validations on every following block after the genesis block in the incoming chain
    for (let i=1; i < chain.length; i++){
      const block = chain[i];
      const lastBlock = chain[i-1];
      if(block.lastHash !== lastBlock.hash || block.hash !== Block.blockHash(block)) {
        return false;
      }
    }

    return true;
  }

}

module.exports = Blockchain;
