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

  render() {
    const network = this.props.match.params.network;

    const transactionsHistory = new TransactionsHistory(network);

    const processedText = function(isProcessed) {
      if(isProcessed) {
        return 'Yes'
      } else {
        return 'No'
      }
    }

    const chronologicallyRecords = transactionsHistory.pastTransactions().reverse();

    const transactions = chronologicallyRecords.map(function(transaction) {
      const shortHash = `${transaction.hash.substring(0, 4)}...${transaction.hash.substring(transaction.hash.length - 4, transaction.hash.length)}`

      return (
        <tr key={transaction.hash} data-hash={transaction.hash}>
          <td className="date">{transaction.startingTime}</td>
          <td>{shortHash}</td>
          <td>{transaction.description}</td>
          <td>{JSON.stringify(transaction.params)}</td>
          <td>{processedText(transaction.processed)}</td>
        </tr>
      )
    });

    return (
      <div className="staticContainer">
        <table className="transactionsTable">
          <thead>
            <tr>
              <td className="date">Time</td>
              <td className="transactionHash">Hash</td>
              <td className="description">Description</td>
              <td className="params">Params</td>
              <td className="status">Processed?</td>
            </tr>
          </thead>
          <tbody>
            {transactions}
          </tbody>
        </table>
      </div>
    )
  }
}

export default Transactions;
