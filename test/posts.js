module.exports = {
  CONTRACT: "0x3240c5bac4d98855f6c32b1182942bd7d91cd7f0",

  'There are two posts': function(browser) {
    App.goToBlog(this.CONTRACT, browser);

    App.expectToHavePost(aPost, browser);
    App.expectToHavePost(anotherPost, browser);

    browser.end();
  },
}

var App = {
  BLOG_URL: "http://app:90/?address=",
  TIMEOUT: 3000,

  goToBlog: function(address, browser) {
    browser.
      url(this.BLOG_URL + address).
      waitForElementVisible("body", this.TIMEOUT).
      pause(3000).
      saveScreenshot('./screenshots/home.png')
  },

  expectToHavePost: function(post, browser) {
    browser.assert.containsText("body", this.titleFor(post.title))
  },

  titleFor: function(title) {
    return (this.getDate() + ' | ' + title)
  },

  getDate: function() {
    date = new Date;

    return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
  }
}

var aPost = {
  title: "Hello World",
  content: "<p>Just another blog post</p>"
}

var anotherPost = {
  title: "Another Blog Post",
  content: '<h1 id="thisisapost">This is a Post</h1>\n<p>It supports Markdown of course or <em>no</em>?</p>'
}
