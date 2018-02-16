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
          //if (word == '') { word = '\n' }
          result += word + ' ';
        }
        //result.replace(/\r?,/g, ":\n");
        resolve(result.replace(/\r?:|,/g, "\n"))
      }
    })
  })
}

// df with grep ///////////////////////////////////////////////////////////////////////////////////
let getDisk = () => {
  return new Promise((resolve, reject) => {
    let top = exec('df -Ph|grep -E "^/dev"', (error, stdout, stderr) => {
      if (error) { reject(error.code) }
      else { resolve(stdout.replace(/\s{2,}/g," ")) }
    })
  })
}
// work with fail2ban /////////////////////////////////////////////////////////////////////////////
let getJails = () => {
  return new Promise((resolve, reject) => {
    let top = exec('sudo fail2ban-client status|grep Jail', (error, stdout, stderr) => {
      if (error) { reject(error.code) }
      else {
        let jails = stdout.split(':'),
            temp = jails[1].split(',');
        jails = [];
        for (let jail of temp){
          jail = jail.replace(/\t|\n/g," ");
          jails.push(jail.trim());
        }
        resolve(jails)
      }
    })
  })
}

let getList = (ipres, jail) => {
  return new Promise((resolve, reject) => {
  let ipList = exec(`sudo fail2ban-client status ${jail}|grep Banned`, (error, stdout, stderr) => {
    if (error) { reject(error.code) }
    else {
      let iparr = stdout.split(':'),
          temp = iparr[1].split(',');
      for (let ip of temp){
        ip = ip.replace(/\t|\n/g," ");
        ipres.push(ip.trim());
      }
      resolve(ipres)
    }
  })
  })
}

let fail2ban = () => {
  return new Promise((resolve, reject) => {
    getJails()
      .then(jails => {
        let ipres = [];
        for (let jail of jails) {
          getList(ipres, jail)
            .then(stdout => {
              if (jails.indexOf(jail) == jails.length-1){
                let str = '';
                for (let i of ipres){
                  str += i + '\n'
                }
                //console.log(str);
                resolve(str)
              }
            })
            .catch((err) => { console.log(err.message) });
        }
      })
      .catch((err) => { console.log(err.message) });
  })
}

module.exports = { getUptime, getTop, getDisk, fail2ban };