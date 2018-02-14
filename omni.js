'use strict';

const network = require('./middleware/network'),
      private_info = require('./private_info'),
      TelegramBot = require('node-telegram-bot-api'),
      omni = new TelegramBot(private_info.token, { polling: true });

// BOT function ///////////////////////////////////////////////////////////////////////////////////
omni.onText(/\/getmyid/, (msg) => {
  let hostname = '';
  network.getHostname()
    .then((res) => {
      hostname = res;
        console.log( `${hostname} Send user ID ${msg.from.id}` );
        omni.sendMessage( private_info.ownerID, `${hostname}\nYour user ID: ${msg.from.id}` )
          .catch((err) => { console.log( `${hostname} Error: ${err.message}` ) });
    })
    .catch((err) => {
      console.log( `GetHostname error: ${err.message}` );
    });
});

omni.onText(/\/getip/, (msg) => {
  let hostname = '';
  network.getHostname()
    .then((res) => {
      hostname = res;
      if (msg.from.id != private_info.ownerID){
        console.log( `${hostname} Unauthorized request from user ID${msg.from.id}!!!` );
        omni.sendMessage(private_info.ownerID, `${hostname}\nUnauthorized request from user ID ${msg.from.id} !!!`)
          .catch((err) => { console.log( `${hostname} Error: ${err.message}` ) });
        omni.sendMessage(msg.chat.id, `Access denied!!!`)
          .catch((err) => { console.log( `${hostname} Error: ${err.message}` ) });
      } else {
        network.updateIP()
          .then(ip => {
            console.log( `${hostname} Send ip to user: ${msg.from.id}, chat ID: ${msg.chat.id}` );
            omni.sendMessage(msg.chat.id, `${hostname}\nCurrent ip: ${ip}`)
              .catch((err) => { console.log( `${hostname} Error: ${err.message}` ) });
          })
          .catch((err) => { console.log( `${hostname} UpdateIP error: ${err.message}` ) });
      }
  })
    .catch((err) => {
      console.log( `GetHostname error: ${err.message}` );
    });
});

// Error handling /////////////////////////////////////////////////////////////////////////////////
omni.on('polling_error', (err) => {
  let hostname = '';
  network.getHostname()
    .then((res) => { hostname = res })
    .catch((err) => { console.log( `GetHostname error: ${err.message}`) });
  console.log( `${hostname} Polling error: ${err.message}` );
});

omni.on('webhook_error', (err) => {
  let hostname = '';
  network.getHostname()
    .then((res) => { hostname = res })
    .catch((err) => { console.log( `GetHostname error: ${err.message}` ) });
  console.log( `${hostname} Webhook error: ${err.message}` );
});