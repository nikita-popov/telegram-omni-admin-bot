'use strict';

const { exec } = require('child_process');

// uptime /////////////////////////////////////////////////////////////////////////////////////////
let getUptime = () => {
  return new Promise((resolve, reject) => {
    let uptime = exec('/usr/bin/uptime', (error, stdout, stderr) => {
      if (error) { reject(error.code) }
      else {
        let result = `${stdout}`,
            temp = result.split(' ');
        result = '';
        for (let word of temp){
          if (word == '') { word = '\n' }
          result += word + ' ';
        }
        resolve(result);
      }
    })
  })
}

// top with grep //////////////////////////////////////////////////////////////////////////////////
let getTop = () => {
  return new Promise((resolve, reject) => {
    let top = exec('/usr/bin/top -b -n1 -d0|grep Tasks', (error, stdout, stderr) => {
      if (error) { reject(error.code) }
      else {
        let result = stdout.split(' '),
            temp = result;
        result = '';
        for (let word of temp){
          if (word == '') { word = '\n' }
          result += word + ' ';
        }
        resolve(stdout)
      }
    })
  })
}

module.exports = { getUptime, getTop };