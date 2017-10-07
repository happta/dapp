import Web3 from 'web3'

class LightWallet {
  client() {
    var defaultEndpoint = "http://testrpc:8545";

    if (typeof web3 == "undefined") {
      console.log("Consider trying Metamask...");

      return (
        new Web3(
          new Web3.providers.HttpProvider(defaultEndpoint)
        )
      )
    } else {
      return new Web3(web3.currentProvider);
    }
  }

  networkId(callback) {
    this.client().version.getNetwork((error, networkId) => {
      callback(networkId)
    });
  }
}

export default LightWallet;
