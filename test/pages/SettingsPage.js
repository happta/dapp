class SettingsPage {
  constructor(browser, straight = true) {
    this.browser = browser;
    this.timeout = 3000

    if(straight) {
      const url = "http://app:3001/privatenet/settings"
      this.browser.
        url(url).
        waitForElementVisible("body", this.timeout)
    }
  }

  expectToBeInSettingsPage() {
    this.browser.assert.containsText("body", "Reset to default node");
  }

  goToHomePage() {
    const HomePage = require("./HomePage.js")

    this.browser.click("#goToHome");

    return (new HomePage(this.browser, false))
  }

  setupTestConfig() {
    this.browser.url(this.url);
    this.browser.clearValue("#hostField");
    this.browser.setValue("#hostField", "ipfs");

    this.browser.clearValue("#portField");
    this.browser.setValue("#portField", "5002");
  }
}

module.exports = SettingsPage;
