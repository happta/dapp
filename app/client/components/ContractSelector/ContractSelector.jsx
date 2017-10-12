import React, { Component } from 'react';
import Blog from '../../Blog.sol'

class ContractSelector extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section className="contractSelector">
        <form onSubmit={this.goToContract.bind(this)}>
          <input type="text" id="contractInput" />
          <button id="goToContract" onClick={this.goToContract.bind(this)}>Go to blog</button>
        </form>
        <form>
          <input type="text" id="newPlatformTitle" />
          <button disabled={!this.props.writerModeEnabled} onClick={this.createNewPublishingPlatform.bind(this)}>Create Platform</button>
        </form>
      </section>
    );
  }

  goToContract() {
    const addressContainer = document.getElementById("contractInput");
    const address = addressContainer.value;
    const network = this.props.match.params.network;
    const route = `/${network}/${address}`;

    this.props.history.push(route);
  }

  createNewPublishingPlatform(event) {
    event.preventDefault();
    const compiledContract = Blog['Blog.sol:Blog']
    const contract = this.props.lightWalletClient.eth.contract(compiledContract.abi);

    const title = document.getElementById("newPlatformTitle").value

    contract.new(title,
      {
        from: this.props.lightWalletClient.eth.accounts[0],
        data: compiledContract.bytecode
      }, function (e, contract){
        if(contract != undefined && contract.transactionHash) {
          this.waitForTransaction(contract.transactionHash).then(function(deployedContract) {
            const network = this.props.match.params.network;
            const route = `/${network}/${deployedContract.contractAddress}`;

            this.props.history.push(route);
          }.bind(this));
        }
      }.bind(this));
  }

  waitForTransaction(txnHash, interval) {
    var transactionReceiptAsync;
    interval = interval ? interval : 500;
    transactionReceiptAsync = function(txnHash, resolve, reject) {
      this.props.lightWalletClient.eth.getTransactionReceipt(txnHash, (error, receipt) => {
        if (error) {
          reject(error);
        } else {
          if (receipt == null) {
            setTimeout(function () {
              transactionReceiptAsync(txnHash, resolve, reject);
            }, interval);
          } else {
            resolve(receipt);
          }
        }
      });
    }.bind(this);

    if (Array.isArray(txnHash)) {
      var promises = [];
      txnHash.forEach(function (oneTxHash) {
        promises.push(this.props.lightWalletClient.eth.getTransactionReceiptMined(oneTxHash, interval));
      });
      return Promise.all(promises);
    } else {
      return new Promise(function (resolve, reject) {
        transactionReceiptAsync(txnHash, resolve, reject);
      });
    }
  }
}

export default ContractSelector;
