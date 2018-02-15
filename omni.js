'use strict';

const network = require('./middleware/network'),
      bash = require('./middleware/bash'),
      private_info = require('./private_info'),
      TelegramBot = require('node-telegram-bot-api'),
      omni = new TelegramBot(private_info.token, { polling: true });

// BOT function ///////////////////////////////////////////////////////////////////////////////////
let checkID = (hostname, msg) => {
  if (msg.from.id == private_info.ownerID){ return true } 
  else {
    console.log(`${hostname} Unauthorized request from user ID ${msg.from.id} !!!`);
    omni.sendMessage(private_info.ownerID, `${hostname}\nUnauthorized request from user ID ${msg.from.id} !!!`)
      .catch((err) => { console.log(`${hostname} Error: ${err.message}`) });
    omni.sendMessage(msg.chat.id, `Access denied!!!`)
      .catch((err) => { console.log(`${hostname} Error: ${err.message}`) });
    return false;
  }
}

// getmyid ////////////////////////////////////////////////////////////////////////////////////////
omni.onText(/\/getmyid/, (msg) => {
  network.getHostname()
    .then((hostname) => {
      console.log(`${hostname} Send user ID ${msg.from.id}`);
      if (msg.from.id == private_info.ownerID) {
        omni.sendMessage( msg.from.id, `${hostname}\nYour user ID: ${msg.from.id}`)
          .catch((err) => { console.log(`${hostname} Error: ${err.message}`) });
      } else {
        omni.sendMessage( msg.from.id, `Your user ID: ${msg.from.id}`)
          .catch((err) => { console.log(`${hostname} Error: ${err.message}`) });
      }
    })
    .catch((err) => {
      console.log(`GetHostname error: ${err.message}`);
    });
});

// getip //////////////////////////////////////////////////////////////////////////////////////////
omni.onText(/\/getip/, (msg) => {
  network.getHostname()
    .then((hostname) => {
      if (checkID(hostname, msg)) {
        network.updateIP()
          .then(ip => {
            console.log(`${hostname} Send ip to user: ${msg.from.id}`);
            omni.sendMessage(msg.chat.id, `${hostname}\nCurrent ip: ${ip}`)
              .catch((err) => { console.log(`${hostname} Error: ${err.message}`) });
          })
          .catch((err) => { console.log(`${hostname} UpdateIP error: ${err.message}`) });
      }
    })
    .catch((err) => {
      console.log(`GetHostname error: ${err.message}`);
    });
});

// gettop /////////////////////////////////////////////////////////////////////////////////////////
omni.onText(/\/gettop/, (msg) => {
  network.getHostname()
    .then((hostname) => {
      if (checkID(hostname, msg)) {
        bash.getTop()
          .then(top => {
            console.log(`${hostname} Send top info ${top.replace(/\r?\n/g, "")}`);
            omni.sendMessage( private_info.ownerID, `${hostname}\nTop info: ${top}`)
              .catch((err) => { console.log(`${hostname} Error: ${err.message}`) });
          })
          .catch((err) => {
            console.log(`GetTop error: ${err.message}`);
          });
      }
    })
    .catch((err) => {
      console.log(`GetHostname error: ${err.message}`);
    });
});

// getuptime //////////////////////////////////////////////////////////////////////////////////////
omni.onText(/\/getuptime/, (msg) => {
  network.getHostname()
    .then((hostname) => {
      if (checkID(hostname, msg)) {
        bash.getUptime()
          .then(uptime => {
            console.log(`${hostname} Send uptime info ${uptime.replace(/\r?\n/g, "")}`);
            omni.sendMessage( private_info.ownerID, `${hostname}\nUptime info: ${uptime}`)
              .catch((err) => { console.log(`${hostname} Error: ${err.message}`) });
          })
          .catch((err) => {
            console.log(`GetUptime error: ${err.message}`);
          });
      }
    })
    .catch((err) => {
      console.log(`GetHostname error: ${err.message}`);
    });
});
///////////////////////////////////////////////////////////////////////////////////////////////////

// Error handling /////////////////////////////////////////////////////////////////////////////////
omni.on('polling_error', (err) => {
  let hostname = '';
  network.getHostname()
    .then((res) => { hostname = res })
    .catch((err) => { console.log(`GetHostname error: ${err.message}`) });
  console.log(`${hostname} Polling error: ${err.message}`);
});

omni.on('webhook_error', (err) => {
  let hostname = '';
  network.getHostname()
    .then((res) => { hostname = res })
    .catch((err) => { console.log(`GetHostname error: ${err.message}`) });
  console.log(`${hostname} Webhook error: ${err.message}`);
});