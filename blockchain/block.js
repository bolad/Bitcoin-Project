const SHA256 = require('crypto-js/sha256');

//Declare the overall difficulty of the system
const DIFFICULTY = 4;
class Block {
  constructor(timestamp, lastHash, hash, data, nonce) {
    this.timestamp = timestamp;
    this.lastHash = lastHash;
    this.hash = hash;
    this.data = data;
    this.nonce = nonce;
  }

  toString() {
    return `Block -
      Timestamp: ${this.timestamp}
      Last Hash: ${this.lastHash.substring(0, 10)}
      Hash     : ${this.hash.substring(0, 10)}
      Nonce    : ${this.nonce}
      Data     : ${this.data}`;
  }

  static genesis(){
    return new this('Genesis time', '----', 'f1r57-h45h', []);
  }

  //Add the ability to generate new blocks based on the last block and some given data to store
  static mineBlock(lastBlock, data) {
    let hash, timestamp;
    const lastHash = lastBlock.hash;
    let nonce = 0;

    /*
    continue generating new hash values based on new nonce values by running a loop that increments
    the nonce value and generates a new hash until the hash passes our condition of starting with the
    right number of leading zeros according to the difficulty
    */

    do {
      nonce++;
      timestamp = Date.now();
      hash = Block.hash(timestamp, lastHash, data, nonce);
    } while (hash.substring(0, DIFFICULTY) !== '0'.repeat(DIFFICULTY));

    return new this(timestamp, lastHash, hash, data, nonce);
  }

  //This function will represent the unique data we want to generate the hash for
  static hash(timestamp, lastHash, data, nonce){
    return SHA256(`${timestamp}${lastHash}${data}${nonce}`).toString();
  }

  //returns a generated hash for the current block based on the block implementation
  static blockHash(block) {
    //grab all values needed to generate hash
    const {timestamp, lastHash, data, nonce} = block;
    return Block.hash(timestamp, lastHash, data, nonce);
  }
}

/*
Make sure this Block  class is shared from a file by exporting it as a module
that can be included in other files
*/
module.exports = Block;
