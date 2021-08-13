/* eslint-disable indent */
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
    return console.log('Fields filled correctly');
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
    return console.log('Search successful');
  } catch (err) {
    return console.error('Error: ', err);
  }
};

// eslint-disable-next-line space-before-function-paren
ScrapPage.prototype.getDataTable = async function () {
  try {
    const data = await this.page.evaluate(
      (selector = 'table.k-selectable tr') => {
        const elementos = document.querySelectorAll(selector);
        const inf = [];
        for (const el of elementos) {
          inf.push(el.innerText);
        }
        return inf;
        // eslint-disable-next-line comma-dangle
      }
    );
    return data;
  } catch (err) {
    return console.error('Error: ', err);
  }
};

// eslint-disable-next-line space-before-function-paren
ScrapPage.prototype.getHeadersTable = async function () {
  try {
    const data = await this.page.evaluate(
      (selector = 'table.k-selectable th') => {
        const elements = document.querySelectorAll(selector);
        const info = [];
        for (const el of elements) {
          info.push(el.innerText);
        }
        return info;
        // eslint-disable-next-line comma-dangle
      }
    );

    console.log(data);
  } catch (err) {
    return console.error('Error: ', err);
  }
};

// eslint-disable-next-line space-before-function-paren
ScrapPage.prototype.printTable = async function (data, headers, separator) {
  try {
    const dataArray = [];
    for (let i = 0; i < data.length; i++) {
      dataArray[i] = data[i].split(separator);
    }
    // const headers = dataArray.splice(0, 1);
    // console.log(dataArray);
    // console.log(headers);

    console.table(dataArray, headers);
  } catch (err) {
    return console.error('Error: ', err);
  }
};

module.exports = ScrapPage;
