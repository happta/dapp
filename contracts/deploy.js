var parameters = process.argv.slice(2);
var title = parameters[0];

var config = require('./config.js');
var getTransactionReceiptMined = require('./get_transaction_receipt_mined.js');

var fs = require("fs")
var Web3 = require("web3")
var EthTx = require("ethereumjs-tx")
var solc = require("solc")

var readContract = function(filename) {
  var file = fs.readFileSync(filename);
  return file.toString()
}

var web3 = new Web3(new Web3.providers.HttpProvider(config.ENDPOINT))

var name = "Blog"
var filename = name + ".sol"
var contractSource = readContract(filename)
var compiledContracts = solc.compile(contractSource)

var contractReference = ":" + name
var contract = compiledContracts.contracts[contractReference]

var abi = JSON.parse(contract.interface)
var facedContract = web3.eth.contract(abi)

var bytecode = contract.bytecode
var rawContractData = facedContract.new.getData(title, {
  data: '0x' + bytecode
});

var rawTx = {
  nonce: web3.toHex(web3.eth.getTransactionCount(config.PUBLIC_KEY)),
  gasPrice: web3.toHex(21000000000),
  gasLimit: web3.toHex(1000000),
  data: rawContractData
}

var tx = new EthTx(rawTx)
var privateKeyx = new Buffer(config.PRIVATE_KEY, 'hex')
tx.sign(privateKeyx)
var serializedTx = '0x' + tx.serialize().toString('hex')

web3.eth.sendRawTransaction(serializedTx, function(error, txReference){
  console.log('Transaction: ' + txReference);

  console.log('Waiting for the transaction to be mined...')

  getTransactionReceiptMined.do(txReference, web3).then(function(data){
    console.log('Contract address: ' + data.contractAddress);
  });
});