'use strict';

const { exec } = require('child_process');

let getFrame = (camera) => {
  return new Promise((resolve, reject) => {
    let top = exec(`aaa ${camera}`, (error, stdout, stderr) => {
      if (error) { reject(error.code) }
      else { resolve(frame) }
    })
  })
}

module.exports = { getFrame };