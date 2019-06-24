const Blockchain = require('./blockchain');
const Block = require('./block');

describe('Blockchain', () => {
  let bc, bc2;

  beforeEach(() => {
    bc = new Blockchain();
    bc2 = new Blockchain();
  });

   it('starts with the genesis block', () => {
     expect(bc.chain[0]).toEqual(Block.genesis());
   });

   it('adds a new block', () => {
     const data = "foo";
     bc.addBlock(data);
     expect(bc.chain[bc.chain.length-1].data).toEqual(data);
   });

   it("validates a valid chain", () => {
     //add a block to the second blockchain instance and store the data 'foo' in it
     bc2.addBlock('foo');

     //validate this chain using the first block instance
     expect(bc.isValidChain(bc2.chain)).toBe(true);
   });

   it("invalidates a chain with a corrupt genesis block", () => {
     //let's corrupt the first element of the second Blockchain by inserting wrong data
     bc2.chain[0].data = 'bad data';

     expect(bc.isValidChain(bc2.chain)).toBe(false);
   });

   it("invalidates a corrupt chain", () => {
     // Add a bad block which isn't the genesis block
     bc2.addBlock('foo');

    //Corrupt that data by changing the element in the first position('foo')
    bc2.chain[1].data = 'Not foo';

    expect(bc.isValidChain(bc2.chain)).toBe(false);
  });

  it("replaces the chain with a valid chain", () => {
    bc2.addBlock("goo");
    bc.replaceChain(bc2.chain);

    expect(bc.chain).toEqual(bc2.chain);
  });

  it("does not replace the chain with one of less than or eqaul to length", () => {
    bc.addBlock('foo');//this chain has two blocks now; the genesis block + this new block
    bc.replaceChain(bc2.chain);

    expect(bc.chain).not.toEqual(bc2.chain);
  });

});
