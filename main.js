'use strict';

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require('path');

let mainWindow;

function createWindow () {
  mainWindow = new BrowserWindow({width: 800, height: 600, icon: './images/windowIcon.jpg'});
  mainWindow.loadURL('file://' + __dirname + '/public/index.html');
  //mainWindow.webContents.openDevTools();
  mainWindow.setTitle("Export Editing")

  mainWindow.on('closed', function() {
    mainWindow = null;
  });
}

app.on('ready', createWindow);
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});
