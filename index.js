const client = require("cheerio-httpcli");
const firebaseURL = "https://status.firebase.google.com";

module.exports = () => {
  const res = client.fetchSync(firebaseURL);
  const $ = res.$;
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
};
