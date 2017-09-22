pragma solidity ^0.4.11;

contract Blog {
  struct Post {
    string content;
    uint256 time;
  }
  address public owner;
  string public title;
  string public constant VERSION = '0.1';

  function Blog(string _title) {
    owner = msg.sender;
    title = _title;
  }

  Post[] public posts;

  function publishPost(string ipfsReference) {
    if(msg.sender != owner) {
      throw;
    }

    posts.push(Post(ipfsReference, block.timestamp));
  }

  function setTitle(string _title) {
    if(msg.sender != owner) {
      throw;
    }

    title = _title;
  }

  function getPost(uint _id) constant returns(string _ipfsReference, uint256 time) {
    Post post = posts[_id];

    return (
      post.content,
      post.time
    );
  }

  function numberOfPosts() constant returns(uint _count) {
    return posts.length;
  }
}
