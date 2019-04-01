const {app, BrowserWindow} = require('electron');
const myip = require('quick-local-ip');
const express = require('express');
const WebSocket = require('ws');
const bodyParser = require('body-parser');

// Config
const Config = {
    http_port: '8080',
    socket_port: '3030'
};

// Http server
const _app = express();
const server = require('http').Server(_app);
server.listen(Config.http_port);

// WSS server
const wss = new WebSocket.Server({port: Config.socket_port});

// Console print
console.log('[SERVER]: WebSocket on: ' + myip.getLocalIP4() + ':' + Config.socket_port); // print websocket ip address
console.log('[SERVER]: HTTP on: ' + myip.getLocalIP4() + ':' + Config.http_port); // print web server ip address

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        acceptFirstMouse: true,
        autoHideMenuBar: true,
        useContentSize: true,
    });
    // mainWindow.loadURL('index.html')
    mainWindow.loadURL('http://localhost:8080');
    mainWindow.focus();
    // mainWindow.setFullScreen(true);

    // Open the DevTools.
    mainWindow.webContents.openDevTools();

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        mainWindow = null
    })
}

app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow()
    }
})

/**
 * EXPRESS
 */
_app.use(bodyParser.urlencoded({
    extended: false
}));

_app.use('/assets', express.static(__dirname + '/www/assets'))

_app.get('/', function (req, res) {
    res.sendFile(__dirname + '/www/index.html');
});

/**
 * WEBSOCKET
 */
wss.getUniqueID = function () {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }

    return s4() + s4() + '-' + s4();
};

wss.on('connection', function connection(ws, req) {
    ws.id = wss.getUniqueID();

    ws.on('close', function close() {
        console.log('[SERVER]: Client disconnected.');
    });

    ws.on('message', function incoming(recieveData) {
        console.log('[SERVER] Message:', recieveData);

        // Example use
        // send(recieveData);

        sendAll(recieveData);
    });

    // Send back to client
    function send(data) {
        data = JSON.stringify(data);
        ws.send(data);
    }

    // Send to all clients
    function sendAll(data) {
        data = JSON.stringify(data);

        wss.clients.forEach(function each(client) {
            client.send(data);
        });
    }
});
