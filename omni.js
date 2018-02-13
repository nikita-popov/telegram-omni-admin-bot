'use strict';

const network = require('./middleware/network');
const token = require('./token');
const moment = require('moment');

const TelegramBot = require('node-telegram-bot-api');
const omni = new TelegramBot(token.token, { polling: true });


// BOT function ///////////////////////////////////////////////////////////////////////////////////
omni.onText(/\/getip/, (msg) => {
  network.updateIP()
    .then(ip => {
      console.log(moment().format('YYYY-MM-DD  HH:mm:ss'), `Send ip to user: ${msg.from.id}`);
      omni.sendMessage(msg.chat.id, `Current ip is ${ip}.`)
        .catch((err) => {
          console.log(moment().format('YYYY-MM-DD  HH:mm:ss'), `Error: ${err.message}`);
        });
    })
    .catch((err) => {
      console.log(moment().format('YYYY-MM-DD  HH:mm:ss'), `UpdateIP error: ${err.message}`);
    });
});

// Error handling
omni.on('polling_error', (err) => {
  console.log(moment().format('YYYY-MM-DD  HH:mm:ss'), `Polling error: ${err.message}`);  // => 'EFATAL'
});

omni.on('webhook_error', (err) => {
  console.log(moment().format('YYYY-MM-DD  HH:mm:ss'), `Webhook error: ${err.message}`);  // => 'EPARSE'
});