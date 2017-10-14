module.exports = {
  HOST_NAME: "a_node",
  PORT: "9000",
  PROTOCOL: "ALOHA",
  PAGE_TITLE: "Settings Page",

  'Can modify the ipfs node to connect': function(browser) {
    App.goToHome(browser);
    App.goToSettings(browser);

    App.expectToHaveTitle(this.PAGE_TITLE, browser);

    App.changeIpfsNodeHostTo(this.HOST_NAME, browser);
    App.changeIpfsNodePortTo(this.PORT, browser);
    App.changeIpfsNodeProtocolTo(this.PROTOCOL, browser);

    App.goToHome(browser);
    App.goToStraightToSettings(browser);

    App.expectIpfsHostNodeToBe(this.HOST_NAME, browser);
    App.expectIpfsPortNodeToBe(this.PORT, browser);
    App.expectIpfsProtocolNodeToBe(this.PROTOCOL, browser);

    browser.end();
  },

  DEFAULT_HOST_NAME: "ipfs",
  DEFAULT_PORT: "5002",
  DEFAULT_PROTOCOL: "http",

  'Can reset values to default': function(browser) {
    App.goToHome(browser);
    App.goToSettings(browser);

    App.changeIpfsNodeHostTo("not host", browser);
    App.changeIpfsNodePortTo("not port", browser);
    App.changeIpfsNodeProtocolTo("not protocol", browser);

    App.resetDefaultSettings(browser);

    App.expectIpfsHostNodeToBe(this.DEFAULT_HOST_NAME, browser);
    App.expectIpfsPortNodeToBe(this.DEFAULT_PORT, browser);
    App.expectIpfsProtocolNodeToBe(this.DEFAULT_PROTOCOL, browser);

    browser.end();
  }
}

var App = {
  HOME_URL: "http://app:3001",
  SETTINGS_URL: "http://app:3001/settings",

  goToHome: function(browser) {
    browser.url(this.HOME_URL);
  },

  goToSettings: function(browser) {
    browser.click("#goToSettings")
  },

  expectToHaveTitle: function(title, browser) {
    browser.assert.containsText("body", title)
  },

  goToStraightToSettings: function(browser) {
    browser.click("#goToSettings")
  },

  changeIpfsNodeHostTo(name, browser) {
    browser.clearValue("#hostField");
    browser.setValue("#hostField", name);
  },

  changeIpfsNodePortTo(name, browser) {
    browser.clearValue("#portField");
    browser.setValue("#portField", name);
  },

  changeIpfsNodeProtocolTo(name, browser) {
    browser.clearValue("#protocolField");
    browser.setValue("#protocolField", name);
  },

  expectIpfsHostNodeToBe(name, browser) {
    browser.expect.element("#hostField").to.have.value.that.equals(name);
  },

  expectIpfsPortNodeToBe(port, browser) {
    browser.expect.element("#portField").to.have.value.that.equals(port);
  },

  expectIpfsProtocolNodeToBe(protocol, browser) {
    browser.expect.element("#protocolField").to.have.value.that.equals(protocol);
  },

  resetDefaultSettings(browser) {
    browser.click("#resetSettings");
  }
}