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
    const services = {};
    incidentURLs.forEach(i => {
      const serviceName = decodeURI(i.match(/.*\/incident\/(.*)\/\d*$/)[1]);
      if (Object.keys(services).includes(serviceName)) {
        services[serviceName].push(i);
      } else {
        services[serviceName] = [i];
      }
    });

    return services;
  });
};
