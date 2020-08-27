const { app, BrowserWindow } = require('electron')
const path = require("path");

function createWindow () {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  win.loadURL(path.join(__dirname, '/src/index.html'))
}

app.whenReady().then(createWindow)