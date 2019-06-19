// This file will be used to explore the Block class

const Block = require('./block');

const fooBlock = Block.mineBlock(Block.genesis(), 'foo');
console.log(fooBlock.toString());
