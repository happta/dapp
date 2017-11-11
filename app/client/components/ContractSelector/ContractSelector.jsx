import React, { Component } from 'react';
import Blog from '../../Blog.sol'
import Spinner from '../Blog/Spinner'
import TransactionsHistory from '../TransactionsHistory'

class ContractSelector extends Component {
  constructor(props) {
    super(props);

    this.state = {
      publishingContract: false
    }
  }

  render() {
    const publishContractForm = (
      <div className="contractSelectorFormContainer row grid-margin card">
        <div className="card-body">
          <form className="form-inline row">
            <input type="text" className="form-control p-input col-9" id="newPlatformTitle" placeholder="Title" />
            <div className="col-3">
              <button disabled={!this.props.writerModeEnabled} className="btn btn-primary" onClick={this.createNewPublishingPlatform.bind(this)}>Create Platform</button>
            </div>
          </form>
        </div>
      </div>
    )

    return (
      <section className="container page-body-wrapper">
        <div className="content-wrapper full-page-wrapper">
          <div className="row grid-margin">
            <div className="col-1"></div>
            <div className="col-10">
              <div></div>
              {!this.state.publishingContract && publishContractForm}
              {this.state.publishingContract && <Spinner />}
            </div>
            <div className="col-1"></div>
          </div>

          <h1 className="page-title">Use cases</h1>

          <div className="row grid-margin">
            <div className="col-4">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">Project updates</h4>
                  <p className="card-text">
                    We use the project to release the project updates.
                  </p>

                  <a href="http://dapp.happta.com/mainnet/0x2f71749f84131a4c1ad4ddeec15fde33a58ddf93" className="btn btn-primary cursor">See it in action</button>
                </div>
              </div>
            </div>
            <div className="col-4">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">Personal</h4>
                  <p className="card-text">It can substitute traditional publishing platforms.</p>

                  <button className="btn btn-primary cursor">See it in action</button>
                </div>
              </div>
            </div>
            <div className="col-4">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">Corporate announcements</h4>
                  <p className="card-text">DAOs can issue their official statements in a reliable way.</p>

                  <a href="mailto:miguelbeltransanz@gmail.com" className="btn btn-secondary">Contact us</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  createNewPublishingPlatform(event) {
    event.preventDefault();

    const transactionsHistory = new TransactionsHistory(this.props.match.params.network);


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
        transactionsHistory.registerNewTransaction(
          tentativeContract.transactionHash,
          'Create new publishing platform',
          {
            'Platform title': title
          }
        )

        if(tentativeContract!= undefined && tentativeContract.transactionHash) {
          this.waitForTransaction(tentativeContract.transactionHash).then(function(deployedContract) {
            const network = this.props.match.params.network;
            const route = `/${network}/${deployedContract.contractAddress}`;

            this.setState({
              publishingContract: false
            });

            transactionsHistory.markTransactionAsProcessed(tentativeContract.transactionHash);

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
