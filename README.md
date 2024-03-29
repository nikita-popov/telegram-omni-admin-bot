# omni-bot
DDNS and server operation Telegram bot.  
Tested on Node.js version [8.9.4 LTS](https://nodejs.org/dist/v8.9.4/node-v8.9.4-x64.msi "Download 8.9.4 LTS") and Debian GNU/Linux 9.3.  
  
### Special thanks
_©IP-API.com_ - for the provided JSON API  
_©fail2ban_ - for protecting my servers  

## Available commands
* _/getmyid_ - returns your Telegram ID
* _/getip_ - returns external IPv4 of the your server
* _/gettop_ - returns task count on your server
* _/getuptime_ - returns your server uptime and load average
* _/getdisk_ - returns disk space status
* _/getfail2ban_ - returns banned IP list in all [fail2ban](https://www.fail2ban.org "If you have fail2ban installed") jails
* _/getbanned_ - returns a list of users who have many spam and have been blocked. Saves the state only until the bot is restarted.  
  
You can change the name of the commands in the source package.  

## Setup and startup
First, install _Node.js_ (if not already installed) via the link above.  
After downloading, run _npm_ in the project directory to download the dependencies and wait until the download is complete.  
```bash
   $ npm i
```
Files _private_info.json_ and _omni.service_ should be located in the working directory.  
### private_info.json example
Dont't forget to edit the file with your bot token and user ID!
```json
{
  "token": "123456789:ABCDEFGHIJKLMNOPQRSTUV_123WXYZAB-CDEF",
  "ownerID": "111111111"
}
```

### omni.service example
Dont't forget to edit the file for your file system!
```bash
[Unit]
Description=NODE-Omni-Server

[Service]
Type=simple

WorkingDirectory=/var/www/omni

TimeoutStartSec=0
ExecStart=/usr/bin/node omni.js
ExecStop=/bin/kill $MAINPID

Restart=always

StandardOutput=syslog
StandardError=syslog
SyslogIdentifier=NODE-Omni-Server

User=web
Group=web

Environment=NODE_ENV=production

[Install]
WantedBy=multi-user.target
```

### Setup systemd for start _omni-bot_ like service
1. Go to the directory _/etc/systemd/system/_
```bash
  cd /etc/systemd/system/
```
2. Create symbolic link to file _omni.service_ in project root directory
```bash
  sudo ln -s /var/www/omni/omni.service omni.service
```
3. Reload systemd service for re-read settings
```bash
  sudo systemctl daemon-reload
```
4. Enable _omni-bot_ like service
```bash
  sudo systemctl enable omni.service
``` 
5. Start _omni-bot_ like service
```bash
  sudo systemctl start omni.service
```
