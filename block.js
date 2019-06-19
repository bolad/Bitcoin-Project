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
}

/*
Make sure this Block  class is shared from a file by exporting it as a module
that can be included in other files
*/
module.exports = Block;
