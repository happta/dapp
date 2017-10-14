import React, { Component } from 'react';
import Blog from '../../Blog.sol'
import Spinner from '../Blog/Spinner'

class ContractSelector extends Component {
  constructor(props) {
    super(props);

    this.state = {
      publishingContract: false
    }
  }

  render() {
    const publishContractForm = (
      <form>
        <div className='contractSelectorFormContainer'>
          <input type="text" className="Input contractInput"  id="newPlatformTitle" placeholder="Title" />
          <button disabled={!this.props.writerModeEnabled} onClick={this.createNewPublishingPlatform.bind(this)} className="Button Button--primary">Create Platform</button>
        </div>
      </form>
    )

    return (
      <section className="contractSelector container">
        <div className="formsContainer">
          <form onSubmit={this.goToContract.bind(this)}>
            <div className='contractSelectorFormContainer'>
              <input type="text" className="Input contractInput" id="contractInput" placeholder="Address" />
              <button id="goToContract" className="Button Button--primary" onClick={this.goToContract.bind(this)} >Go to blog</button>
            </div>
          </form>
          <div className="separator"></div>
          {!this.state.publishingContract && publishContractForm}
          {this.state.publishingContract && <Spinner />}
        </div>
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

    this.setState({
      publishingContract: true
    });

    const compiledContract = Blog['Blog.sol:Blog']
    const contract = this.props.lightWalletClient.eth.contract(compiledContract.abi);

    const title = document.getElementById("newPlatformTitle").value

    contract.new(title,
      {
        from: this.props.lightWalletClient.eth.accounts[0],
        data: compiledContract.bytecode
      }, function (e, tentativeContract){
        if(tentativeContract!= undefined && tentativeContract.transactionHash) {
          this.waitForTransaction(tentativeContract.transactionHash).then(function(deployedContract) {
            const network = this.props.match.params.network;
            const route = `/${network}/${deployedContract.contractAddress}`;

            this.setState({
              publishingContract: false
            });
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
