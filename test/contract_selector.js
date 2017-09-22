module.exports = {
  BLOG_ADDRESS: "0x3240c5bac4d98855f6c32b1182942bd7d91cd7f0",
  BLOG_TITLE: "A test blog",

  'Can select the contract and go to the blog': function(browser) {
    App.goToContractSelector(browser);

    App.fillContractAddress(this.BLOG_ADDRESS, browser);

    App.goToBlog(browser);

    App.expectToHaveTitle(this.BLOG_TITLE, browser);

    browser.end();
  },

  'If the blog does not exist, it shows an alert': function(browser) {
    App.goToContractSelector(browser);

    App.fillContractAddress('NOT_A_BLOG', browser);

    App.goToBlog(browser);

    App.expectBlogToHaveNotFoundAlert(browser);

    browser.end();
  }
}

var App = {
  TIMEOUT: 3000,
  CONTRACT_SELECTOR_URL: "http://app:90/",
  UNEXISTING_BLOG_ALERT: "There is no blog associated to this contract.",

  goToContractSelector: function(browser) {
    return browser.
      url(this.CONTRACT_SELECTOR_URL).
      waitForElementVisible("body", this.TIMEOUT)
  },

  fillContractAddress: function(address, browser) {
    browser.setValue("#contractInput", address)
  },

  goToBlog: function(browser) {
    browser.
      click("#goToContract").
      pause(3000)
  },

  expectToHaveTitle: function(title, browser) {
    browser.assert.containsText("#titleContent", title)
  },

  expectBlogToHaveNotFoundAlert: function(browser) {
    browser.assert.containsText("body", this.UNEXISTING_BLOG_ALERT)
  }
}
