'use strict';

const network = require('./middleware/network'),
      private_info = require('./private_info');

const moment = require('moment');

const TelegramBot = require('node-telegram-bot-api'),
      omni = new TelegramBot(private_info.token, { polling: true });

// BOT function ///////////////////////////////////////////////////////////////////////////////////
omni.onText(/\/getip/, (msg) => {
  let hostname = '';
  getHostname()
    .then((res) => {
      hostname = res;
      if (msg.from.id != private_info.ownerID){
        console.log(moment().format('YYYY-MM-DD  HH:mm:ss'), `${hostname} Unauthorized request from user ID${msg.from.id}!!!`);
        omni.sendMessage(private_info.ownerID, `${hostname} Unauthorized request from user ID${msg.from.id}!!!`)
          .catch((err) => {
            console.log(moment().format('YYYY-MM-DD  HH:mm:ss'), `${hostname} Error: ${err.message}`);
          });
        omni.sendMessage(msg.chat.id, `Access denied!!!`)
          .catch((err) => {
            console.log(moment().format('YYYY-MM-DD  HH:mm:ss'), `${hostname} Error: ${err.message}`);
          });
      } else {
        network.updateIP()
          .then(ip => {
            console.log(moment().format('YYYY-MM-DD  HH:mm:ss'), `${hostname} Send ip to user: ${msg.from.id}, chat ID: ${msg.chat.id}`);
            omni.sendMessage(msg.chat.id, `${hostname} Current ip is ${ip}.`)
              .catch((err) => {
                console.log(moment().format('YYYY-MM-DD  HH:mm:ss'), `${hostname} Error: ${err.message}`);
              });
          })
          .catch((err) => {
            console.log(moment().format('YYYY-MM-DD  HH:mm:ss'), `${hostname} UpdateIP error: ${err.message}`);
          });
      }
  })
    .catch((err) => {
      console.log(('YYYY-MM-DD  HH:mm:ss'), `GetHostname error: ${err.message}`);
    });
});

// Error handling /////////////////////////////////////////////////////////////////////////////////
omni.on('polling_error', (err) => {
  let hostname = '';
  getHostname()
    .then((res) => {
      hostname = res;
    })
    .catch((err) => {
      console.log(('YYYY-MM-DD  HH:mm:ss'), `GetHostname error: ${err.message}`);
    });
  console.log(moment().format('YYYY-MM-DD  HH:mm:ss'), `${hostname} Polling error: ${err.message}`);
});

omni.on('webhook_error', (err) => {
  llet hostname = '';
  getHostname()
    .then((res) => {
      hostname = res;
    })
    .catch((err) => {
      console.log(('YYYY-MM-DD  HH:mm:ss'), `GetHostname error: ${err.message}`);
    });
  console.log(moment().format('YYYY-MM-DD  HH:mm:ss'), `${hostname} Webhook error: ${err.message}`);
});