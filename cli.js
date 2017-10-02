#!/usr/bin/env node

const chalk = require("chalk");
const firebaseStatus = require(".");

firebaseStatus()
  .then(services => {
    if (services.length <= 0) {
      console.log(chalk.green.bold("All services are available."));
      return;
    }

    Object.keys(services).forEach(serviceName => {
      console.log(chalk.bold.underline.red(serviceName));
      services[serviceName].forEach(i => console.log(i));
    });
  })
  .catch(console.error);
