#!/usr/bin/env node

const client = require("cheerio-httpcli");
const chalk = require("chalk");

const firebaseURL = "https://status.firebase.google.com";

const res = client.fetchSync(firebaseURL);
const $ = res.$;
const incidentURLs = Array.from(
  $("table.timeline-table a").map(function() {
    return firebaseURL + $(this).attr("href");
  })
);

if (incidentURLs.length <= 0) {
  console.log("Incident is none.");
  process.exit(0);
}

const services = {};
incidentURLs.forEach(i => {
  const serviceName = decodeURI(i.match(/.*\/incident\/(.*)\/\d*$/)[1]);
  if (Object.keys(services).includes(serviceName)) {
    services[serviceName].push(i);
  } else {
    services[serviceName] = [i];
  }
});

Object.keys(services).forEach(serviceName => {
  console.log(chalk.bold.underline.red(serviceName));
  services[serviceName].forEach(i => console.log(i));
  console.log();
});

process.exit(0);
