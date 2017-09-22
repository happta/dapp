class ShowPosts {
  render() {
    var loadingState = {
      title: true,
      posts: [],
      postsAdded: false
    }

    var checkLoading = function() {
      var loadedAlready = loadingState.title == false && loadingState.posts.indexOf(true) == -1 && loadingState.postsAdded == true;

      if(loadedAlready){
        hideLoadingAlert();
        showBlogContent();
      }
    }

    try {
      var contractWithAbi = web3.eth.contract(JSON.parse(abi));
      var blog = contractWithAbi.at(address);
      blog.numberOfPosts.call()
    } catch(err) {
      hideLoadingAlert();
      showWrongContractAlert();
    }

    var numberOfPosts = parseInt(blog.numberOfPosts.call());

    var posts = [];

    var title = blog.title.call();
    setTitle(title);
    loadingState.title = false;

    for(var reference = 0; reference < numberOfPosts; reference++) {
      var post = blog.getPost(reference)
      posts.push(post);
      loadingState.posts.push(true);
    }

    loadingState.postsAdded = true;

    if(posts.length == 0) {
      var noPostsAlert = document.createElement('h3')
      noPostsAlert.innerText = 'There are no posts yet...'
      document.querySelector('.list').appendChild(noPostsAlert);
    }

    var list = document.getElementById("postsList");
    var referenceIndex = 0;

    function showContent(inmutablePost) {
      return function(err, stream) {
        var content = ''

        stream.on('data', function (chunk) {
          content += chunk.toString();
        })

        stream.on('end', function () {
          var parsedPost = JSON.parse(content);

          var listElement = document.createElement('li');
          listElement.setAttribute('data-title', parsedPost.title);
          listElement.setAttribute('data-content', parsedPost.content);
          var date = new Date(parseInt(inmutablePost[1]) * 1000);
          var formattedDate = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
          listElement.innerText = formattedDate + ' | ' + parsedPost.title;

          listElement.addEventListener('click', function(element) {
            var title = element.target.getAttribute('data-title')
            var content = element.target.getAttribute('data-content')

            vex.open({
              unsafeContent: '<h1>' + title + '</h1>' + converter.makeHtml(content),
              contentClassName: 'modalPost'
            })
          });

          list.appendChild(listElement);
          loadingState.posts[loadingState.posts.indexOf(true)] = false;
          checkLoading();
        });
      }
    }

    posts.forEach(function(post, index) {
      var contentReference = post[referenceIndex];

      ipfsClient.cat(contentReference, showContent(post));
    });

    var version = blog.VERSION.call();
    document.querySelector('.version').innerText = version

    checkLoading();
  }
}
