// get access to the Block class
const Block = require('./block');
const { DIFFICULTY}  = require('../config');

describe('Block', () => {

  // declare global variables for the test unit
  let data, lastBlock, block;

  /*
  Instead of creating a Block instance inside each of the tests, we can a jest function
  called 'beforeEach' which allows us to run the same code for each of the unit tests
  */
  beforeEach(() => {
    // assign any data to test
    data = 'bar';

    // assign a lastBlock constant (we can use the dummy genesis block)
    lastBlock = Block.genesis();

    //create a block using the static mineBlock function
    block = Block.mineBlock(lastBlock, data);
  });

  //test that the block sets a data that matches the input data
  it('sets that `data` to match the input data', () => {
    expect(block.data).toEqual(data);
  });

  //test to ensure that the last hash is set properly
  it('sets the `lastHash` to match the hash of the last block', () => {
    expect(block.lastHash).toEqual(lastBlock.hash);
  });

  //check that its generates a hash matching the difficulty with the leading zeros
  it('generates a hash that matches the difficulty', () => {
    expect(block.hash.substring(0, block.difficulty)).toEqual('0'.repeat(block.difficulty));
    console.log(block.toString());
  });

  //test that difficulty is lowered if mining time is too slow
  it('lowers the difficulty for slowly mined blocks', () => {
    expect(Block.adjustDifficulty(block, block.timestamp+360000)).toEqual(block.difficulty - 1);
  });

  it('raises the difficulty for quickly mined blocks', () => {
    expect(Block.adjustDifficulty(block, block.timestamp+1)).toEqual(block.difficulty + 1);

  });

});
