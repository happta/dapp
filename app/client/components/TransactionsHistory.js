import LightWallet from './LightWallet'

class TransactionsHistory {
  constructor(network) {
    this.network = network
    this.storageIdentifier = `TransactionsHistory-${network}`
  }

  registerNewTransaction(hash, description, params={}) {
    const transaction = {
      hash: hash,
      description: description,
      params: params,
      processed: false,
      startingTime: new Date()
    }

    const pastTransactions = this.pastTransactions()
    pastTransactions.push(transaction);

    const transactions = pastTransactions;

    localStorage.setItem(this.storageIdentifier, JSON.stringify(transactions))
  }

  countPendingTransactions() {
    const pendingTransactions = this.pastTransactions().filter(function(transaction){
      return transaction.processed == false
    });

    return pendingTransactions.length;
  }

  markTransactionAsProcessed(hash) {
    const transactions = this.pastTransactions()
    const transactionIndex = transactions.findIndex(function(transaction){
      return transaction.hash == hash
    });

    transactions[transactionIndex].processed = true

    localStorage.setItem(this.storageIdentifier, JSON.stringify(transactions))
  }

  checkPendingTransactions() {
    this.pendingTransactions().forEach(function(transaction) {
      const lightWallet = new LightWallet();
      const client = lightWallet.client(this.network);

      client.eth.getTransaction(transaction.hash, function(error, ongoingTransaction){
        if(ongoingTransaction.blockNumber) {
          this.markTransactionAsProcessed(transaction.hash);
        }
      }.bind(this))
    }.bind(this));
  }

  pendingTransactions() {
    return (this.pastTransactions().filter(function(transaction){
      return transaction.processed == false
    }))
  }


  pastTransactions() {
    const pastStorage = localStorage.getItem(this.storageIdentifier);

    if(pastStorage) {
      return JSON.parse(pastStorage);
    }

    return [];
  }
}

export default TransactionsHistory;