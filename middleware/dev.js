'use strict';

const { exec } = require('child_process');

let getFrame = (cam) => {
  return new Promise((resolve, reject) => {
  	let rm = exec(`rm ./frame${cam}.jpg`, (error, stdout, stderr) => {
      if (error) { reject(error) }
    })
    let top = exec(`sudo ffmpeg -f video4linux2 -s 640x480 -i /dev/video${cam} -ss 0:0:2 -frames 1 ./frames/frame${cam}.jpg`, (error, stdout, stderr) => {
      if (error) { reject(error) }
      else { resolve(`Camera ${cam}`) }
    })
  })
}

module.exports = { getFrame };