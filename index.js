const axios = require("axios");
const cheerio = require("cheerio");
const firebaseURL = "https://status.firebase.google.com";

module.exports = () => {
  return axios(firebaseURL).then(res => {
    const $ = cheerio.load(res.data);
    const incidentURLs = Array.from(
      $("table.timeline-table a").map(function() {
        return firebaseURL + $(this).attr("href");
      })
    );

    return format(incidentURLs);
  });
};

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
