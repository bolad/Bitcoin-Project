// get access to the Block class
const Block = require('./block');

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

});
