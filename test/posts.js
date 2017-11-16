const SettingsPage = require("./pages/SettingsPage.js")

module.exports = {
  CONTRACT: "0x3240c5bac4d98855f6c32b1182942bd7d91cd7f0",
  POST_TITLE: "Another Blog Post",
  POST_CONTENT: "It supports Markdown of course",

  beforeEach: function(browser) {
    const settingsPage = new SettingsPage(browser);

    settingsPage.setupTestConfig();
  },

  'There are two posts': function(browser) {
    App.goToBlog(this.CONTRACT, browser);

    App.expectToHavePost(aPost, browser);
    App.expectToHavePost(anotherPost, browser);

    browser.end();
  },

  'The post is displayed when you click on it': function(browser) {
    App.goToBlog(this.CONTRACT, browser);

    App.clickOnPostWithTitle(this.POST_TITLE, browser);

    App.expectToHaveContent(this.POST_CONTENT, browser)

    browser.end();
  },

  'After entering the post, you can come back to the home page': function(browser) {
    App.goToBlog(this.CONTRACT, browser);

    App.clickOnPostWithTitle(this.POST_TITLE, browser);

    App.expectToHaveContent(this.POST_CONTENT, browser);

    App.comeBackToBlog(browser);

    App.expectToHavePost(aPost, browser);
    App.expectToHavePost(anotherPost, browser);

    browser.end();
  }
}

var App = {
  BLOG_URL: "http://app:3001/privatenet/",
  TIMEOUT: 3000,

  goToBlog: function(address, browser) {
    browser.
      url(this.BLOG_URL + address).
      waitForElementVisible("body", this.TIMEOUT).
      pause(3000)
  },

  clickOnPostWithTitle: function(title, browser) {
    browser.waitForElementVisible('div[data-title="' + title + '"]', this.TIMEOUT)
    browser.click('div[data-title="' + title + '"]')
  },

  expectToHavePost: function(post, browser) {
    browser.pause(1000);
    browser.assert.containsText("body", this.getDate())
    browser.assert.containsText("body", post.title)
  },

  expectToHaveContent: function(text, browser) {
    browser.assert.containsText("body", text)
  },

  getDate: function() {
    date = new Date;

    const monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ]

    return `${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()}`
  },

  comeBackToBlog: function(browser) {
    browser.click("#goToRootLink")
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
