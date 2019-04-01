# electron-websocket-express

**Electron node.js with websocket and web server express.**

This is a minimal Electron application based on the [Quick Start Guide](https://electronjs.org/docs/tutorial/quick-start) within the Electron documentation.

## To Use

To clone and run this repository you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
git clone git@github.com:mafikes/electron-websocket-express.git
# Go into the repository
cd electron-websocket-express
# Install dependencies
npm install
# Run the app
npm start
```

Note: If you're using Linux Bash for Windows, [see this guide](https://www.howtogeek.com/261575/how-to-run-graphical-linux-desktop-applications-from-windows-10s-bash-shell/) or use `node` from the command prompt.

## Set connection in app
In www/assets/js/connect.js you must set your IP address of server. 
When you start app, start express server on localhost:8080 and websocket with port 3030. 
In console you see your IP address where start your server.

```js
let Connect = {
    ip_address: '192.168.100.198', // edit by yours
    port: '3030', // port
```

## Contact
For more information [contact me](https://mafikes.cz/kontakt).

