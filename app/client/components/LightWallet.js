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
        id: 43
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
