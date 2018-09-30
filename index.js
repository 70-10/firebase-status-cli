const co = require("co");
const puppeteer = require("puppeteer");
const firebaseURL = "https://status.firebase.google.com";

module.exports = co.wrap(function*() {
  const browser = yield puppeteer.launch();
  const page = yield browser.newPage();
  yield page.goto(firebaseURL);
  const incidentURLs = yield page.$$eval("table.timeline-table a", list =>
    list.map(data => data.href)
  );
  yield browser.close();

  return format(incidentURLs);
});

function format(list) {
  return list.reduce((obj, url) => {
    const serviceName = decodeURI(url.match(/.*\/incident\/(.*)\/\d*$/)[1]);
    if (!Object.keys(obj).includes(serviceName)) {
      obj[serviceName] = [];
    }

    obj[serviceName].push(url);
    return obj;
  }, {});
}

module.exports.format = format;
