const HomePage = require("./pages/HomePage.js")
const SettingsPage = require("./pages/SettingsPage.js")

module.exports = {
  'The initial page is the contract selector': function(browser) {
    const homePage = new HomePage(browser)

    browser.saveScreenshot('./home.png');
    homePage.expectToBeInHomePage();

    browser.end();
  },

  'Can navigate to settings page': function(browser) {
    const homePage = new HomePage(browser)
    const settingsPage = homePage.goToSettingsPage();

    settingsPage.expectToBeInSettingsPage();
  },

  'Can navigate to home page': function(browser) {
    const settingsPage = new SettingsPage(browser);
    const homePage = settingsPage.goToHomePage();

    homePage.expectToBeInHomePage();
  }
}
