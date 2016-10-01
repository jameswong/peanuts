'use strict'

const phantomjs = require('phantomjs-prebuilt');
phantomjs.exec('check-flight.js').on('exit', (code) => {
  console.log('done');
  process.exit(0);
});
