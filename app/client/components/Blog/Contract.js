import Settings from '../Settings/Settings'

import ipfsAPI from 'ipfs-api'

window.Buffer = Buffer;

class Contract {
  constructor(lightWalletClient, address) {
    this.lightWalletClient = lightWalletClient;
    this.address = address;
  }

  loadTitle(callback) {
    return this._remoteInstance().title.call(function(error, title){
      callback(title);
    });
  }

  countPosts(callback) {
    this._remoteInstance().numberOfPosts.call(function(error, numberOfPosts){
      let count = parseInt(numberOfPosts);
      callback(count);
    });
  }

  publishPost(post, callback) {
    const postAsBuffer = new Buffer(JSON.stringify(post))

    this.uploadContent(postAsBuffer).
      then(hash => this.registerInTheContract(hash, callback));
  }

  registerInTheContract(hash, callback) {
    this._remoteInstance().publishPost(hash, {
      from: this.lightWalletClient.eth.accounts[0]
    }, function(error, tx) {
      this.waitForTransaction(tx).then(function(a) {
        callback(tx);
      });
    }.bind(this));
  }

  uploadContent(content) {
    const settings = new Settings();

    const publishUrl = `${settings.protocol()}://${settings.host()}:${settings.port()}/ipfs/`

    return new Promise(function(resolve, reject) {
      fetch(publishUrl, {
        method: 'POST',
        body: content,
        mode: 'cors'
      }).then(function(response){
        var hash = ''

        for (var pair of response.headers.entries()) {
          if(pair[0] == 'ipfs-hash') {
            hash = pair[1]
          }
        }

        if(hash != '' && hash != undefined) {
          resolve(hash);
        } else {
          throw 'Upload to IPFS failure'
        }
      });
    }.bind(this));
  }

  _ipfsClient() {
    const settings = new Settings();

    let ipfsNode = { host: settings.host(), port: settings.port(), protocol: settings.protocol() };

    return ipfsAPI(ipfsNode);
  }

  loadOwner(callback) {
    this.checkIfItsAValidBlog(function(valid) {
      if(valid) {
        this._remoteInstance().owner.call(function(error, ownerAddress){
          callback(ownerAddress);
        });
      }
    }.bind(this));
  }

  loadPosts(callback) {
    this._remoteInstance().numberOfPosts.call(function(error, numberOfPosts){
      let count = parseInt(numberOfPosts);
      this._loadPosts(count, callback);
    }.bind(this));
  }

  _loadPosts(count, callback) {
    for(var reference = 0; reference < count; reference++) {
      this._loadPost(reference, callback);
    }
  }

  _loadPost(reference, callback) {
    this._remoteInstance().getPost(reference, function(error, record){
      const post = {
        identifier: record[0],
        date: new Date(record[1] * 1000)
      }

      const settings = new Settings();

      let ipfsNode = { host: settings.host(), port: settings.port(), protocol: settings.protocol() };
      const ipfs = ipfsAPI(ipfsNode)

      ipfs.cat(post.identifier, {buffer: true}, function (err, res) {
        const rawContent = new Buffer(res).toString();
        const structuredContent = JSON.parse(rawContent)

        post.title = structuredContent.title;
        post.content = structuredContent.content;

        callback(post);
      });
    });
  }

  checkIfItsAValidBlog(callback) {
    const supportedVersions = [
      '0.1'
    ]

    try {
      this._remoteInstance().VERSION.call((error, version) => {
        if(supportedVersions.indexOf(version) != -1) {
          callback(true);
        } else {
          callback(false);
        }
      });
    } catch(err) {
      console.log(err);

      callback(false);
    }
  }

  _remoteInstance() {
    const endpoint = "http://testrpc:8545";
    const abi = '[{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"posts","outputs":[{"name":"content","type":"string"},{"name":"time","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_id","type":"uint256"}],"name":"getPost","outputs":[{"name":"_ipfsReference","type":"string"},{"name":"time","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"title","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_title","type":"string"}],"name":"setTitle","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"ipfsReference","type":"string"}],"name":"publishPost","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"numberOfPosts","outputs":[{"name":"_count","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"VERSION","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"inputs":[{"name":"_title","type":"string"}],"payable":false,"type":"constructor"}]'
    const contractWithAbi = this.lightWalletClient.eth.contract(JSON.parse(abi));
    return contractWithAbi.at(this.address);
  }

  waitForTransaction(txnHash, interval) {
    var transactionReceiptAsync;
    interval = interval ? interval : 500;
    transactionReceiptAsync = function(txnHash, resolve, reject) {
      this.lightWalletClient.eth.getTransactionReceipt(txnHash, (error, receipt) => {
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
        promises.push(this.lightWalletClient.eth.getTransactionReceiptMined(oneTxHash, interval));
      });
      return Promise.all(promises);
    } else {
      return new Promise(function (resolve, reject) {
        transactionReceiptAsync(txnHash, resolve, reject);
      });
    }
  }
}

export default Contract;
