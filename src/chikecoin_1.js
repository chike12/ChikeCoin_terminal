//https://www.youtube.com/watch?v=zVqczFZr124

const SHA256 = require('crypto-js/sha256');

class Block {
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash() {
        return SHA256(this.index + this.timestamp + JSON.stringify(this.data) + this.previousHash + this.nonce).toString();
    }

    mineBlock(difficulty) {
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++;
            this.hash = this.calculateHash();
        }
        console.log("Block mined: " + this.hash);
    }
}

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 2;
    }

    createGenesisBlock() {
        return new Block(0, "01/01/2022", "Genesis block", "0");
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }

    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }

        return true;
    }
}


// Execution
let ChikeCoin = new Blockchain();

console.log("Mining block 1...");
ChikeCoin.addBlock(new Block(1, "01/02/2022", { from: "Chari", to: "Chike", amount: 8 }));
console.log("Mining block 2...");
ChikeCoin.addBlock(new Block(2, "01/03/2022", { from: "Chike", to: "Chari", amount: 10 }));
console.log("Mining block 3...");
ChikeCoin.addBlock(new Block(3, "01/04/2022", { from: "Chari", to: "Chike", amount: 12 }));
console.log("Mining block 4...");
ChikeCoin.addBlock(new Block(4, "01/05/2022", { from: "Chike", to: "Chari", amount: 14 }));

//console.log(JSON.stringify(ChikeCoin, null, 4));
//console.log(ChikeCoin.isChainValid());
//console.log(Array(6).join("0"));
