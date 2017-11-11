import React, { Component } from 'react';

import TransactionsHistory from './TransactionsHistory'

class Transactions extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.interval = setInterval(() => this.setState({ time: Date.now() }), 500);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  linkForTx(tx) {
    const shortHash = `${tx.substring(0, 4)}...${tx.substring(tx.length - 4, tx.length)}`

    if(!this.props.network.transactionExplorer) {
      return shortHash;
    }

    return (
      <a target="_blank" href={`${this.props.network.transactionExplorer}/${tx}`}>{shortHash}</a>
    )
  }

  render() {
    const transactionsHistory = new TransactionsHistory(this.props.network.reference);

    const processedText = function(isProcessed) {
      if(isProcessed) {
        return 'Yes'
      } else {
        return 'No'
      }
    }

    const chronologicallyRecords = transactionsHistory.pastTransactions().reverse();

    const transactions = chronologicallyRecords.map(function(transaction) {
      return (
        <tr key={transaction.hash} data-hash={transaction.hash}>
          <td className="date">{transaction.startingTime}</td>
          <td>{this.linkForTx(transaction.hash)}</td>
          <td>{transaction.description}</td>
          <td>{JSON.stringify(transaction.params)}</td>
          <td>{processedText(transaction.processed)}</td>
        </tr>
      )
    }.bind(this));

    return (
      <section className="container page-body-wrapper">
        <div className="content-wrapper full-page-wrapper" id="#titleContent">
          <div className="row">
            <div className="col-12">
              <h1 className="page-title">Transactions in {this.props.network.name}</h1>
              <div className="card card-body">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th className="date">Time</th>
                      <th className="transactionHash">Hash</th>
                      <th className="description">Description</th>
                      <th className="params">Params</th>
                      <th className="status">Processed?</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default Transactions;
