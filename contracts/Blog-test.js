var assert = require('assert');
var Web3 = require("web3")
var solc = require("solc")
var fs = require("fs")

var testrpcHost = "http://testrpc:8545"
var provider = new Web3.providers.HttpProvider(testrpcHost)
var web3 = new Web3(provider)
var contractOwner = web3.eth.accounts[0]
var notTheContractOwner = web3.eth.accounts[8]

describe("Blog", function(){
  this.timeout(10000);

  describe("Posts Storage", function(){
    it("a post can be inserted with a content reference and a timestamp for being after retrieved", function(done){
      var anIPFSHash = 'QmcDge1SrsTBU8b9PBGTGYguNRnm84Kvg8axfGURxqZpR1'
      var initialTime = Math.round(new Date().getTime() / 1000)

      var publishPost = function(data) {
        return new Promise(function(resolve, reject) {
          data.contract.publishPost(anIPFSHash, {
            from: contractOwner,
            gas: 1000000
          })
          resolve(data);
        });
      }

      var expectToHaveAPost = function (data) {
        var firstPostIndex = 0
        var post = data.contract.getPost(firstPostIndex)
        var relations = {
          content: 0,
          time: 1
        }
        var savedIPSFHash = post[relations['content']]
        var publishingDate = post[relations['time']]

        assert.equal(savedIPSFHash, anIPFSHash);
        assert(publishingDate > initialTime);
      }

      deployBlogContract().
        then(data => publishPost(data)).
        then(data => expectToHaveAPost(data)).
        then(data => done());
    });

    it("the number of posts are retrievable", function(done){
      var posts = [
        { contentReference: 'QmcDge1SrsTBU8b9PBGTGYguNRnm84Kvg8axfGURxqZpR1'},
        { contentReference: 'Qaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'},
      ]

      var publishPosts = function(data, posts) {
        return new Promise(function(resolve, reject) {
          for (var i in posts) {
            var post = posts[i]

            data.contract.publishPost(post.contentReference, {
              from: contractOwner,
              gas: 1000000
            })
          }

          resolve(data);
        });
      }

      var expectToHaveATwoPosts = function(data) {
        var numberOfPosts = data.contract.numberOfPosts.call()
        assert.equal(numberOfPosts, 2);
      }

      deployBlogContract().
        then(data => publishPosts(data, posts)).
        then(data => expectToHaveATwoPosts(data)).
        then(data => done());
    });

    it('only the contract owner can publish a post', function(done){
      var anIPFSHash = 'QmcDge1SrsTBU8b9PBGTGYguNRnm84Kvg8axfGURxqZpR1'

      var publishPostNotBeingTheOwner = function(data) {
        return new Promise(function(resolve, reject) {
          try {
            data.contract.publishPost(anIPFSHash, {
              from: notTheContractOwner,
              gas: 1000000
            })
          } catch(e) {
            var notPerformedOperation = 'VM Exception while processing transaction: invalid opcode'

            if (e.message != notPerformedOperation) {
              throw e
            }
          }

          resolve(data);
        });
      }

      var expectToHaveZeroPosts = function(data) {
        var numberOfPosts = data.contract.numberOfPosts.call()
        assert.equal(numberOfPosts, 0);
      }

      deployBlogContract().
        then(data => publishPostNotBeingTheOwner(data)).
        then(data => expectToHaveZeroPosts(data)).
        then(data => done());
    });

    it('a title can be set on contract initialization', function(done) {
      var aTitle = "My title"

      deployBlogContract(aTitle).
        then(data => expectToHaveTitle(data, aTitle)).
        then(data => done());
    });

    it('a title can be modified after the contract initialization', function(done) {
      var initialTitle = "My title"
      var modifiedTitle = "Another title"
      var changeTitle = function(data, title) {
        return new Promise(function(resolve, reject) {
          data.contract.setTitle(title, {
            from: contractOwner,
            gas: 1000000
          })

          resolve(data);
        });
      }

      deployBlogContract(initialTitle).
        then(data => changeTitle(data, modifiedTitle)).
        then(data => expectToHaveTitle(data, modifiedTitle)).
        then(data => done());
    });

    it('a title can only be modified by the contract owner', function(done) {
      var initialTitle = "My title"
      var modifiedTitle = "Another title"
      var changeTitleNotBeingTheOwner = function(data, title) {
        return new Promise(function(resolve, reject) {
          try {
            data.contract.setTitle(title, {
              from: notTheContractOwner,
              gas: 1000000
            });
          } catch(e) {
            var notPerformedOperation = 'VM Exception while processing transaction: invalid opcode'

            if (e.message != notPerformedOperation) {
              throw e
            }
          }

          resolve(data);
        });
      }

      deployBlogContract(initialTitle).
        then(data => changeTitleNotBeingTheOwner(data, modifiedTitle)).
        then(data => expectToHaveTitle(data, initialTitle)).
        then(data => done());
    });
  });

  describe("Version", function(){
    it("the contract has version 0.1", function(done){
      var version = '0.1'
      var expectToHaveVersion = function(data, version){
        return new Promise(function(resolve, reject) {
          var currentVersion = data.contract.VERSION.call();

          assert.equal(currentVersion, version);

          resolve(data);
        });
      }

      deployBlogContract().
        then(data => expectToHaveVersion(data, version)).
        then(data => done())
    });
  });

  var deployBlogContract = function(title="a title") {
    var name = "Blog"
    var filename = name + ".sol"
    var contractSource = readContract(filename)
    var compiledContracts = solc.compile(contractSource)

    if(compiledContracts.contracts == undefined) {
      throw "Contract compilation error: " + compiledContracts.errors.join("\n")
    }

    var contractReference = ":" + name
    var contract = compiledContracts.contracts[contractReference]

    var abi = JSON.parse(contract.interface)
    var facedContract = web3.eth.contract(abi)

    return new Promise(function(resolve, reject) {
      facedContract.new(title, {
        from: contractOwner,
        data: contract.bytecode,
        gas: 3000000
      }, function(error, contract){
        if(error) { console.log(error) }
        if(contract.address) {
          resolve({ contract: contract })
        }
      })
    })
  }

  var expectToHaveTitle = function(data, expectedTitle) {
    var title = data.contract.title.call()
      assert.equal(title, expectedTitle);
  }
});

var readContract = function(filename) {
  var file = fs.readFileSync(filename);
  return file.toString()
}