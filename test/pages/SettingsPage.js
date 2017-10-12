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
    this.browser.assert.containsText("body", "RESET TO DEFAULT NODE");
  }

  goToHomePage() {
    const HomePage = require("./HomePage.js")

    this.browser.click("#goToHome");

    return (new HomePage(this.browser, false))
  }
}

module.exports = SettingsPage;
