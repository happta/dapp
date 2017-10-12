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
    return typeof web3 != "undefined"
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
        id: 1
      },
      {
        name: 'Ropsten',
        reference: 'ropsten',
        endpoint: 'https://ropsten.infura.io/',
        id: 3
      },
      {
        name: 'Rinkerby',
        reference: 'rinkerby',
        endpoint: 'https://rinkerby.infura.io/',
        id: 4
      },
      {
        name: 'Kovan',
        reference: 'kovan',
        endpoint: 'https://kovan.infura.io/',
        id: 42
      },
      {
        name: 'Privatenet',
        reference: 'privatenet',
        endpoint: 'http://testrpc:8545',
        id: 999999
      }
    ]);
  }
}

export default LightWallet;
