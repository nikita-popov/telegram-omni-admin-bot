'use strict';

const fetch = require('node-fetch'),
      moment = require('moment');

// Get current IP address /////////////////////////////////////////////////////////////////////////
let updateIP = () => {
  const options = {
    headers: { 'Content-Type': 'application/json' },
    method: 'GET'
  };
  return fetch('http://ip-api.com/json', options)
    .then((res) => {
      console.log(moment().format('YYYY-MM-DD  HH:mm:ss'), 'Request succes');
      return res.json();
    })
    .then((data) => {
      console.log(moment().format('YYYY-MM-DD  HH:mm:ss'), `Current ip: ${data.query.toString()}`);
      return(data.query.toString());
    })
    .catch((err) => {
      console.log(moment().format('YYYY-MM-DD  HH:mm:ss'), `Fetch error: ${err.message}`);
    });
}

module.exports = { updateIP };