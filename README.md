# Decentralized Blog

This is a proof of concept and is not ready to use yet.

## Initial configuration

First of all you have to have docker installed.

After you have to configure the environment. For this you have to copy the file placed under `contracts/examples/config.js` to `contracts/config.js` and fill the data required. The data is public key, private key and the endpoint. Configuring the endpoint will depend upon the network you will be working with, [infura](https://infura.io/docs/#endpoints) have some endpoints ready to use.

If you want to point to the development endpoint is: `http://testrpc:8545`

## Anatomy of a post

A post is nothing more than a JSON with this format:

```
{
  "title": "Title goes here",
  "content": "## This is a Markdown content \n _it is_ for real \n"
}
```

## How to deploy the blog?

For deploying the blog you have to deploy an Ethereum contract. Make sure you have your configuration right and run this command:

```
docker-compose run contracts node deploy.js "YOUR BLOG TITLE GOES HERE"
```

After some seconds you should see something like:

```
Transaction: 0xb026c5bffdafa5cdb58f2d1accd83b6fea0a4934c977a6fa6519ae7c80b1bde3
Waiting for the transaction to be mined...
Contract address: 0xce46f6b046ef5692934e51cb5515fbf8e92c0df0
```

The address of the blog is referenced on the "Contract address" part of the output.

## How to publish a post?

For publishing a post you have to add information to the contract. Make sure you have your configuration run and run this command:

```
docker-compose run contracts node publish.js CONTRACT_ADDRESS IPFS_TOKEN
```

An IPFS token looks like: QmUXz5JShQFoKL2u3Xjmf5TQUY69q2bCvsegDuiMhXHRkP
Make sure the token is reachable from the server set up in the app.

After some seconds you should see something:

```
Transaction: 0x7c9f9b71492f602888376aa62f3ef55c9fd9c0ff444429cbba71b4328f50d351
Waiting for the transaction to be mined...
Number of posts: 1
```

You should be able to see the post posted inyour blog.

## How to run the tests?

### Application tests

You have to run the seed file (remember to run it everytime after restarting the docker):

```
./test/seed.sh
```

And run the command which run the tests:

```
docker-compose exec test npm test
```

### Contract tests

You have to run the tests with this command:

```
docker-compose run contracts npm test
```

### All tests

You can run all the tests executing the script:

```
./tests.sh
```

## How can I use the app locally?

The app runs on the port 5005 (e.g: `http://localhost:5005`). If you want to use the app add this configuration to the `/etc/hosts` file:

```
127.0.0.1 testrpc
```