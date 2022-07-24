//Private key: a45af26c4c9de18b300b2d375c0d6b1559170486e10a29dcef4366bfd217ed78
//Public key: 04fe39363c8c62a2cfbbc5a6a6d905ecee22062956621a0d068becf0b2a47104c0f975f26c01c342a62446669966cd14f65d5b53d1a31a31e3a7694329fea7c736

const { Blockchain, Transation } = require('./chikecoin_3');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const myKey = ec.keyFromPrivate('a45af26c4c9de18b300b2d375c0d6b1559170486e10a29dcef4366bfd217ed78');
const myWalletAddress = myKey.getPublic('hex');


let chikeCoin = new Blockchain();

const tx1 = new Transation(myWalletAddress, 'Public key goes here', 10, Date.now());
tx1.signTransaction(myKey);
chikeCoin.addTransaction(tx1);

console.log('\nStarting the miner...');
chikeCoin.minePendingTransactions(myWalletAddress);


const tx2 = new Transation(myWalletAddress, 'Public key goes here', 20, Date.now());
tx2.signTransaction(myKey);
chikeCoin.addTransaction(tx2);

console.log('\nStarting the miner again...');
chikeCoin.minePendingTransactions(myWalletAddress);


//chikeCoin.chain[1].transactions[0].amount = 1;
console.log('\nBalance of myWalletAddress is ', chikeCoin.getBalanceOfAddress(myWalletAddress));
console.log('Is chain valid?', chikeCoin.isChainValid());
console.log(chikeCoin);
console.log(chikeCoin.chain[2]);

//console.log(myKey);
//console.log(myWalletAddress);
