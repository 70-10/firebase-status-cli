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
  console.log("Incidens is none.");
  process.exit(0);
}

incidentURLs.forEach(i => {
  const serviceName = decodeURI(i.match(/.*\/incident\/(.*)\/\d*$/)[1]);
  console.log(chalk.bold.underline.red(serviceName));
  console.log(i);
  console.log();
});

process.exit(0);
