'use strict';

/*const name = 'omni_bot';
const username = 'ikiti_omni_bot';
const TOKEN = '366974957:AAENSuVkgFiMkTjxZcDRF_764SQzFK-LrHM';
const TelegramBot = require('node-telegram-bot-api');

const exec = require('child_process').exec, child;
const loger = require('./middleware/loger');
*/
const http = require('http');
const https = require('https');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');
const htmlparser = require('htmlparser');

const moment = require('moment');
/*
const fs = require('fs');


const omni = new TelegramBot(TOKEN, { polling: true });


// BASH executor //////////////////////////////////////////////////////////////////////////////////
let getAddress = exec('ip a | grep ', (err, stdout, stderr) => {
  let address = '';
  console.log('stdout: ' + stdout);
  console.log('stderr: ' + stderr);
  if (err !== null) {
    console.log(moment().format('YYYY-MM-DD ZZ HH:mm:ss'), `EXEC Error: ${err}`);
  }
  return address;
});
 


// BOT function ///////////////////////////////////////////////////////////////////////////////////
omni.onText( /\/get ip, ($) => {
  getAddress();
});*/

let getAddress = () => {
  /*let newHeaders = new Headers({
    'Content-Type': 'text/html'
  });
  let options = {
    method: 'GET',
    headers: newHeaders,
    mode: 'cors',
    //credentials: '',
    cache: 'no-cache'
  }
  fetch(`https://2ip.ru`, options)
    .then((res) => {
      console.log(moment().format('YYYY-MM-DD ZZ HH:mm:ss'), 'Fetch succes');
      console.log(res);
      // id d_clip_button
      //return res.json();
    })
    /*.then((data) => {
      let response = JSON.stringify(data);
      console.log(response);
    })*/
    /*.catch((err) => {
      console.log(moment().format('YYYY-MM-DD ZZ HH:mm:ss'), 'Fetch error: ', err.message);
    });*/
  
  /*http.get({
    hostname: 'https://2ip.ru',
    port: 80,
    path: '/',
    agent: false  // create a new agent just for this one request
  }, (res) => {
    // Do stuff with response
    console.log(res);
  });*/
/*
  let rawHtml = "Xyz <script language= javascript>var foo = '<<bar>>';< /  script><!--<!-- Waah! -- -->";
  let handler = new htmlparser.DefaultHandler((error, dom) => {
    if (error)
      console.log(moment().format('YYYY-MM-DD ZZ HH:mm:ss'), 'HTML parsing error: ', err.message);
    else
      console.log(moment().format('YYYY-MM-DD ZZ HH:mm:ss'), 'HTML parsing done');
  });
  let parser = new htmlparser.Parser(handler);
  parser.parseComplete(rawHtml);
  console.log(handler.dom);*/


  const options = {
    hostname: 'encrypted.google.com',
    port: 443,
    path: '/',
    method: 'GET',
    headers: {
      'Content-Type': 'text/html'
    }
  };
  const req = https.request(options, (res) => {
    //console.log(res);
    let handler = new htmlparser.DefaultHandler((error, dom) => {
      if (error)
        console.log(moment().format('YYYY-MM-DD ZZ HH:mm:ss'), 'HTML parsing error: ', err.message);
      else
        console.log(moment().format('YYYY-MM-DD ZZ HH:mm:ss'), 'HTML parsing done');
    });
    let parser = new htmlparser.Parser(handler);
    parser.parseComplete(res);
    console.log(handler.dom);
    //let parseRes = res.html();
    /*let ip = parseRes.getElementById('d_clip_button').innerHTML;
    console.log(ip);*/
    res.on('data', (d) => {
      process.stdout.write(d);
    });
  });
  req.on('error', (e) => {
    console.error(e);
  });
  req.end();
}

getAddress();