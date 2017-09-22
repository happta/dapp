var parameters = process.argv.slice(2);
var eth_contract = parameters[0];
var ipfsHash = parameters[1];

var config = require('./config.js');
var getTransactionReceiptMined = require('./get_transaction_receipt_mined.js');

var Web3 = require("web3");
var EthTx = require("ethereumjs-tx")
var abi = '[{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"posts","outputs":[{"name":"content","type":"string"},{"name":"time","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_id","type":"uint256"}],"name":"getPost","outputs":[{"name":"_ipfsReference","type":"string"},{"name":"time","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"ipfsReference","type":"string"}],"name":"publishPost","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"numberOfPosts","outputs":[{"name":"_count","type":"uint256"}],"payable":false,"type":"function"}]'

var web3 = new Web3(new Web3.providers.HttpProvider(config.ENDPOINT))
var contractWithAbi = web3.eth.contract(JSON.parse(abi));
var blog = contractWithAbi.at(eth_contract);

data = blog.publishPost.getData(ipfsHash, {
  gas: 1000000
});

var rawTx = {
  nonce: web3.toHex(web3.eth.getTransactionCount(config.PUBLIC_KEY)),
  gasPrice: web3.toHex(400000000000),
  gasLimit: web3.toHex(4000000),
  to: eth_contract,
  data: data
}

var tx = new EthTx(rawTx)
var privateKeyx = new Buffer(config.PRIVATE_KEY, 'hex')
tx.sign(privateKeyx)
var serializedTx = '0x' + tx.serialize().toString('hex')

web3.eth.sendRawTransaction(serializedTx, function(error, txReference){
  if(error) {
    console.log(error);
  }

  console.log('Transaction: ' + txReference);

  console.log('Waiting for the transaction to be mined...')

  getTransactionReceiptMined.do(txReference, web3).then(function(data){
    console.log('Number of posts: ' + parseInt(blog.numberOfPosts.call()));
  });
});