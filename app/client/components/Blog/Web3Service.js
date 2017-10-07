import Web3 from 'web3'

class Web3Service {
  client() {
    var defaultEndpoint = "http://testrpc:8545";

    if (typeof web3 == 'undefined') {
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
}

export default Web3Service;
