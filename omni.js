'use strict';

const network = require('./middleware/network'),
      private_info = require('./private_info');

const moment = require('moment');

const TelegramBot = require('node-telegram-bot-api'),
      omni = new TelegramBot(private_info.token, { polling: true });

// BOT function ///////////////////////////////////////////////////////////////////////////////////
omni.onText(/\/getip/, (msg) => {
  if (msg.from.id != private_info.ownerID){
    console.log(moment().format('YYYY-MM-DD  HH:mm:ss'), `Unauthorized request from user ID${msg.from.id}!!!`);
    omni.sendMessage(private_info.ownerID, `Unauthorized request from user ID${msg.from.id}!!!`)
      .catch((err) => {
        console.log(moment().format('YYYY-MM-DD  HH:mm:ss'), `Error: ${err.message}`);
      });
    omni.sendMessage(msg.chat.id, `Access denied!!!`)
      .catch((err) => {
        console.log(moment().format('YYYY-MM-DD  HH:mm:ss'), `Error: ${err.message}`);
      });
  } else {
    network.updateIP()
      .then(ip => {
        console.log(moment().format('YYYY-MM-DD  HH:mm:ss'), `Send ip to user: ${msg.from.id}, chat ID: ${msg.chat.id}`);
        omni.sendMessage(msg.chat.id, `Current ip is ${ip}.`)
          .catch((err) => {
            console.log(moment().format('YYYY-MM-DD  HH:mm:ss'), `Error: ${err.message}`);
          });
      })
      .catch((err) => {
        console.log(moment().format('YYYY-MM-DD  HH:mm:ss'), `UpdateIP error: ${err.message}`);
      });
  }
});

// Error handling /////////////////////////////////////////////////////////////////////////////////
omni.on('polling_error', (err) => {
  console.log(moment().format('YYYY-MM-DD  HH:mm:ss'), `Polling error: ${err.message}`);
});

omni.on('webhook_error', (err) => {
  console.log(moment().format('YYYY-MM-DD  HH:mm:ss'), `Webhook error: ${err.message}`);
});