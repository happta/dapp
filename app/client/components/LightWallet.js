import Web3 from 'web3'

class LightWallet {
  client(networkReference) {
    const network = this.findNetworkByReference(networkReference);

    return (
      new Web3(
        new Web3.providers.HttpProvider(network.endpoint)
      )
    )
  }

  publisherClient() {
    return new Web3(web3.currentProvider);
  }

  isPublisherModeAvailable() {
    const isInstalled = typeof web3 != "undefined"

    if(!isInstalled) {
      return false
    }

    const isUnlocked = this.publisherClient().eth.accounts.length > 0

    return isUnlocked;
  }

  isAValidNetwork(networkReference) {
    return (this.findNetworkByReference(networkReference) != undefined)
  }

  findNetworkByReference(reference) {
    return (
      this.networks().find(function(network) {
        return network.reference == reference
      })
    );
  }

  findNetworkByIdWithFallback(id) {
    const network = this.networks().find(function(network) {
      return network.id == id
    });

    return network || this.fallbackNetwork();
  }

  fallbackNetwork() {
    return this.findNetworkByReference('privatenet');
  }

  networkId(client, callback) {
    client.version.getNetwork((error, networkId) => {
      callback(networkId)
    });
  }

  networks() {
    return ([
      {
        name: 'Mainnet',
        reference: 'mainnet',
        endpoint: 'https://mainnet.infura.io/',
        id: 1,
        transactionExplorer: "https://etherscan.io/tx/"
      },
      {
        name: 'Ropsten',
        reference: 'ropsten',
        endpoint: 'https://ropsten.infura.io/',
        id: 3,
        transactionExplorer: "https://ropsten.etherscan.io/tx/"
      },
      {
        name: 'Rinkeby',
        reference: 'rinkerby',
        endpoint: 'https://rinkeby.infura.io/',
        id: 4,
        transactionExplorer: "https://rinkeby.etherscan.io/tx/"
      },
      {
        name: 'Kovan',
        reference: 'kovan',
        endpoint: 'https://kovan.infura.io/',
        id: 42,
        transactionExplorer: "https://kovan.etherscan.io/tx/"
      },
      {
        name: 'Privatenet',
        reference: 'privatenet',
        endpoint: 'http://testrpc:8545',
        id: 999999,
        transactionExplorer: undefined
      }
    ]);
  }
}

export default LightWallet;
