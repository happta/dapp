var hideLoadingAlert = function() {
  document.querySelector(".loading").style = 'display: none;';
}

var showLoadingAlert = function() {
  document.querySelector(".loading").style = 'display: block;';
}

var showContractSelector = function() {
  document.querySelector(".contractSelector").style = 'display: block;';
}

var showWrongContractAlert = function() {
  document.querySelector(".wrongContract").style = 'display: block;'
}

var showPublishPostForm = function() {
  document.querySelector(".publishPost").style = 'display: block;'
}

var showBlogContent = function() {
  document.querySelector(".content").style = 'display: block;'
}

var setTitle = function(title) {
  var titleContainer = document.querySelector("#titleContent");

  titleContainer.innerText = title;
  document.title = title;
}
