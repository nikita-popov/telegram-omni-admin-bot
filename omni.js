'use strict';

const network = require('./middleware/network'),
      bash = require('./middleware/bash'),
      dev = require('./middleware/dev'),
      private_info = require('./private_info'),
      TelegramBot = require('node-telegram-bot-api'),
      omni = new TelegramBot(private_info.token, { polling: true });
let   onbanID = new Map(),
      bannedID = [];

// BOT function ///////////////////////////////////////////////////////////////////////////////////
let checkID = (hostname, msg) => {
  let userID = msg.from.id.toString();
  if (userID == private_info.ownerID) { return true }
  else if (!onbanID.has(userID)) {
    let isBan = false;
    for (let id of bannedID){
      if (userID == id) { isBan = true }
    }
    if (isBan) {
      console.log(`${hostname} Request from banned user ${userID}`);
      omni.sendMessage(msg.chat.id, 'You was bannedID')
      .catch((err) => { console.log(`${hostname} Error: ${err.message}`) });
      return false;
    } else if (!isBan) {
      onbanID.set(userID, 1);
      console.log(`${hostname} Unauthorized request from user ID ${userID} !!!`);
      omni.sendMessage(private_info.ownerID, `${hostname}\nUnauthorized request from user ID ${userID} !!!`)
      .catch((err) => { console.log(`${hostname} Error: ${err.message}`) });
      omni.sendMessage(msg.chat.id, `Access denied!!!`)
      .catch((err) => { console.log(`${hostname} Error: ${err.message}`) });
      return false;
    }
  } else if (onbanID.has(userID)) {
    let count = parseInt(onbanID.get(userID));
    if (count < 3) {
      onbanID.set(userID, count+1);
      console.log(`${hostname} Unauthorized request from user ID ${userID} !!!`);
      omni.sendMessage(private_info.ownerID, `${hostname}\nUnauthorized request from user ID ${userID} !!!`)
      .catch((err) => { console.log(`${hostname} Error: ${err.message}`) });
      omni.sendMessage(msg.chat.id, `Access denied!!!`)
      .catch((err) => { console.log(`${hostname} Error: ${err.message}`) });
      return false;
    } else {
      onbanID.delete(userID);
      bannedID.push(userID);
      omni.sendMessage(msg.chat.id, 'You was bannedID')
      .catch((err) => { console.log(`${hostname} Error: ${err.message}`) });
      return false;
    }
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
  .catch((err) => { console.log(`GetHostname error: ${err.message}`) });
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
  .catch((err) => { console.log(`GetHostname error: ${err.message}`) });
});

// gettop /////////////////////////////////////////////////////////////////////////////////////////
omni.onText(/\/gettop/, (msg) => {
  network.getHostname()
  .then((hostname) => {
    if (checkID(hostname, msg)) {
      bash.getTop()
      .then(top => {
        console.log(`${hostname} Send top info ${top.replace(/\r?\n/g, "")}`);
        omni.sendMessage( private_info.ownerID, `${hostname}\n${top}`)
        .catch((err) => { console.log(`${hostname} Error: ${err.message}`) });
      })
      .catch((err) => { console.log(`GetTop error: ${err.message}`) });
    }
  })
  .catch((err) => { console.log(`GetHostname error: ${err.message}`) });
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
      .catch((err) => { console.log(`GetUptime error: ${err.message}`) });
    }
  })
  .catch((err) => { console.log(`GetHostname error: ${err.message}`) });
});

// getdisk ////////////////////////////////////////////////////////////////////////////////////////
omni.onText(/\/getdisk/, (msg) => {
  network.getHostname()
  .then((hostname) => {
    if (checkID(hostname, msg)) {
      bash.getDisk()
      .then(df => {
        console.log(`${hostname} Send uptime info ${df.replace(/\r?\n/g, "")}`);
        omni.sendMessage( private_info.ownerID, `${hostname}\nDisk info:\n${df}`)
        .catch((err) => { console.log(`${hostname} Error: ${err.message}`) });
      })
      .catch((err) => { console.log(`GetUptime error: ${err.message}`) });
    }
  })
  .catch((err) => { console.log(`GetHostname error: ${err.message}`) });
});

// getfail2ban ////////////////////////////////////////////////////////////////////////////////////
omni.onText(/\/getfail2ban/, (msg) => {
  network.getHostname()
  .then((hostname) => {
    if (checkID(hostname, msg)) {
      bash.fail2ban()
      .then(banned => {
        console.log(`${hostname} Send fail2ban banned IP info: ${banned.replace(/\r?\n/g, "")}`);
        omni.sendMessage( private_info.ownerID, `${hostname}\nBanned IP list:\n${banned}`)
        .catch((err) => { console.log(`${hostname} Error: ${err.message}`) });
      })
      .catch((err) => { console.log(`GetUptime error: ${err.message}`) });
    }
  })
  .catch((err) => { console.log(`GetHostname error: ${err.message}`) });
});

// getbanned //////////////////////////////////////////////////////////////////////////////////////
omni.onText(/\/getbanned/, (msg) => {
  network.getHostname()
  .then((hostname) => {
    if (checkID(hostname, msg)) {
      let banlist = '';
      for (let id of bannedID){ banlist += id + '\n' }
      console.log(`${hostname} Send banned users info: ${banlist.replace(/\r?\n/g, " ")}`);
      omni.sendMessage(msg.chat.id, `${hostname}\nBanned users:\n${banlist}`)
      .catch((err) => { console.log(`${hostname} Error: ${err.message}`) });
    }
  })
  .catch((err) => { console.log(`GetHostname error: ${err.message}`) });
});

// getcam /////////////////////////////////////////////////////////////////////////////////////////
omni.onText(/\/getcam (.+)/, (msg, camera) => {
  network.getHostname()
  .then((hostname) => {
    if (checkID(hostname, msg)) {
      dev.getFrame(camera[1])
      .then(cam => {
        console.log(`${hostname} Send camera ${cam} frame.`);
        omni.sendPhoto(msg.chat.id, `./frames/frame${camera[1]}.jpg`,{caption:`${hostname}  ${cam}`})
        .catch((err) => { console.log(`${hostname} Error: ${err.message}`) });
      })
      .catch(err => { console.log(`${hostname} Error: ${err}`) });
    }
  })
  .catch((err) => { console.log(`GetHostname error: ${err.message}`) });
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