class HomePage {
  constructor(browser, straight=true) {
    this.browser = browser;
    this.timeout = 3000

    if(straight) {
      const url = "http://app:3001/"
      this.browser.
        url(url).
        waitForElementVisible("body", this.timeout)
    }
  }

  expectToBeInHomePage() {
    this.browser.assert.containsText("body", "Go to blog");
  }

  goToSettingsPage() {
    const SettingsPage = require("./SettingsPage.js")

    this.browser.click("#goToSettings");

    return (new SettingsPage(this.browser, false));
  }
}

module.exports = HomePage;
