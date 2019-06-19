// This file will be used to explore the Block class

const Block = require('./block');

const block = new Block("foo", "bar", "jar", "baz");
console.log(block.toString());
console.log(Block.genesis().toString());
