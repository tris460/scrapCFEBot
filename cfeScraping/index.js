/* eslint-disable require-jsdoc */
'use strict';

function ScrapPage(browser) {
  this.browser = browser;
  this.page = browser.page;
}

// eslint-disable-next-line prettier/prettier
ScrapPage.prototype.openNewPage = async function(URLPage) {
  try {
    this.page = await this.browser.newPage();
    console.log('Opening a new tab...');
    await this.page.goto(URLPage);
    return console.log(`${URLPage} has been opened successfully`);
  } catch (err) {
    return console.error('Error: ', err);
  }
};

// eslint-disable-next-line prettier/prettier
ScrapPage.prototype.closeBrowser = async function() {
  try {
    await this.browser.close();
    return console.log('Browser closed successfully');
  } catch (err) {
    return console.error('Error: ', err);
  }
};

// eslint-disable-next-line space-before-function-paren
ScrapPage.prototype.fillInput = async function (id, text, time) {
  try {
    await this.page.waitForTimeout(time);
    await this.page.type(id, text);
    return console.log('Fields fills correctly');
  } catch (err) {
    return console.error('Error: ', err);
  }
};

// eslint-disable-next-line space-before-function-paren
ScrapPage.prototype.clickButton = async function (id, time) {
  try {
    await this.page.click(id);
    console.log('Searching...');
    await this.page.waitForTimeout(time);
    return console.log('Search succesfull');
  } catch (err) {
    return console.error('Error: ', err);
  }
};

// eslint-disable-next-line space-before-function-paren
ScrapPage.prototype.getDataTable = async function () {
  try {
    console.log('Getting data...');
    const data = await this.page.evaluate(() => {
      const elements = document.querySelectorAll('table.k-selectable th b');
      const info = [];
      for (const el of elements) {
        info.push(el.innerText);
      }
      return info;
    });

    const datos = await this.page.evaluate(() => {
      const elementos = document.querySelectorAll('table.k-selectable tr td');
      const informacion = [];
      for (const elemento of elementos) {
        informacion.push(elemento.innerText);
      }
      return informacion;
    });

    console.table(data);
    console.table(datos);
  } catch (err) {
    return console.error('Error: ', err);
  }
};

module.exports = ScrapPage;
