pragma solidity ^0.4.11;

contract Blog {
  struct Post {
    string content;
    uint256 time;
  }
  address public owner;
  string public title;
  string public constant VERSION = '0.1';

  function Blog(string _title) public {
    owner = msg.sender;
    title = _title;
  }

  Post[] public posts;

  function publishPost(string ipfsReference) public {
    assert(msg.sender == owner);

    posts.push(Post(ipfsReference, block.timestamp));
  }

  function setTitle(string _title) public {
    assert(msg.sender == owner);

    title = _title;
  }

  function getPost(uint _id) public constant returns(string _ipfsReference, uint256 time) {
    Post storage post = posts[_id];

    return (
      post.content,
      post.time
    );
  }

  function numberOfPosts() public constant returns(uint _count) {
    return posts.length;
  }
}
