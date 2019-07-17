const SHA256 = require('crypto-js/sha256');
const { DIFFICULTY, MINE_RATE}  = require('../config');

class Block {
  constructor(timestamp, lastHash, hash, data, nonce, difficulty) {
    this.timestamp = timestamp;
    this.lastHash = lastHash;
    this.hash = hash;
    this.data = data;
    this.nonce = nonce;
    this.difficulty = difficulty || DIFFICULTY;
  }

  toString() {
    return `Block -
      Timestamp : ${this.timestamp}
      Last Hash : ${this.lastHash.substring(0, 10)}
      Hash      : ${this.hash.substring(0, 10)}
      Nonce     : ${this.nonce}
      Difficulty: ${this.difficulty}
      Data      : ${this.data}`;
  }

  static genesis(){
    return new this('Genesis time', '----', 'f1r57-h45h', [], DIFFICULTY);
  }

  //Add the ability to generate new blocks based on the last block and some given data to store
  static mineBlock(lastBlock, data) {
    let hash, timestamp;
    const lastHash = lastBlock.hash;

    //declare alocal difficulty variable that is assigned to the difficulty key
    //in the last block object using E6 syntax
    let { difficulty } = lastBlock;

    let nonce = 0;

    /*
    continue generating new hash values based on new nonce values by running a loop that increments
    the nonce value and generates a new hash until the hash passes our condition of starting with the
    right number of leading zeros according to the difficulty. eg for DIFFICULTY = 6, Hash = 000000haxi2910jhyd
    */

    do {
      nonce++;
      timestamp = Date.now();
      difficulty = Block.adjustDifficulty(lastBlock, timestamp);
      hash = Block.hash(timestamp, lastHash, data, nonce);
    } while (hash.substring(0, difficulty) !== '0'.repeat(difficulty));

    return new this(timestamp, lastHash, hash, data, nonce, difficulty);
  }

  //This function will represent the unique data we want to generate the hash for
  static hash(timestamp, lastHash, data, nonce, difficulty){
    return SHA256(`${timestamp}${lastHash}${data}${nonce}${difficulty}`).toString();
  }

  //returns a generated hash for the current block based on the block implementation
  static blockHash(block) {
    //grab all values needed to generate hash
    const {timestamp, lastHash, data, nonce, difficulty} = block;
    return Block.hash(timestamp, lastHash, data, nonce, difficulty);
  }
}

/*
Make sure this Block  class is shared from a file by exporting it as a module
that can be included in other files
*/
module.exports = Block;
