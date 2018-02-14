# omni-bot
DDNS and server operation bot.

## Available commands
* _/getmyid_ - return your Telegram ID
* _/getip_ - return external ip

## Setup and startup

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
Description=Omni-bot service

[Service]
Type=simple

WorkingDirectory=/var/www/omni
ExecStart=/usr/bin/node omni.js
ExecStop=/bin/kill $MAINPID
ExecReload=/bin/kill -HUP $MAINPID

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