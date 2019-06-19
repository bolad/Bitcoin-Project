class Block {
  constructor(timestamp, lastHash, hash, data) {
    this.timestamp = timestamp;
    this.lastHash = lastHash;
    this.hash = hash;
    this.data = data;
  }

  toString() {
    return `Block -
      Timestamp: ${this.timestamp}
      Last Hash: ${this.lastHash.substring(0, 10)}
      Hash     : ${this.hash.substring(0, 10)}
      Data     : ${this.data}`;
  }

  static genesis(){
    return new this('Genesis time', '----', 'f1r57-h45h', []);
  }

  //Add the ability to generate new blocks based on the last block and some given data to store
  static mineBlock(lastBlock, data) {
    const timestamp = Date.now();
    const lastHash = lastBlock.hash;
    const hash = 'todo-later';

    return new this(timestamp, lastHash, hash, data);
  }
}

/*
Make sure this Block  class is shared from a file by exporting it as a module
that can be included in other files
*/
module.exports = Block;
