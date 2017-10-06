import Web3 from 'web3'

class Contract {
  constructor(address) {
    this.address = address;
  }

  title() {
    return this._remoteInstance().title.call();
  }

  posts() {
    var numberOfPosts = parseInt(this._remoteInstance().numberOfPosts.call());

    var posts = [];

    for(var reference = 0; reference < numberOfPosts; reference++) {
      const record = this._remoteInstance().getPost(reference)

      const post = {
        identifier: record[0],
        date: new Date(record[1] * 1000)
      }

      posts.push(post);
    }

    return posts;
  }

  isABlog() {
    try {
      this._remoteInstance().VERSION.call();

      return true
    } catch(err) {
      console.log(err);

      return false
    }
  }

  _remoteInstance() {
    const endpoint = "http://testrpc:8545";
    const abi = '[{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"posts","outputs":[{"name":"content","type":"string"},{"name":"time","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_id","type":"uint256"}],"name":"getPost","outputs":[{"name":"_ipfsReference","type":"string"},{"name":"time","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"title","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_title","type":"string"}],"name":"setTitle","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"ipfsReference","type":"string"}],"name":"publishPost","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"numberOfPosts","outputs":[{"name":"_count","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"VERSION","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"inputs":[{"name":"_title","type":"string"}],"payable":false,"type":"constructor"}]'
    const web3 = new Web3(new Web3.providers.HttpProvider(endpoint))
    const contractWithAbi = web3.eth.contract(JSON.parse(abi));
    return contractWithAbi.at(this.address);
  }
}

export default Contract;
