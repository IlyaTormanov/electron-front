const {app, BrowserWindow} = require('electron')
function createWindow () {
    // Create the browser window.
   const win = new BrowserWindow({width: 1100, height: 800})
    win.loadURL('http://localhost:3000/')
}
    app.on('ready', createWindow)