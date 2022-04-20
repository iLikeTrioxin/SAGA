const { BrowserWindow, app, ipcMain } = require('electron');

'use strict';

const debugMode = process.argv.includes('--debug') || process.argv.includes('-d');

var mainWindow;
function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width : 1000 + (debugMode ? 400 : 0),
        height: 600,
        //icon: 'front-end/resources/roxy.png',
        backgroundColor: '#2c3338',
        webPreferences: {
            nodeIntegration : true,
            contextIsolation: false
        },
        frame: false
    });

    //mainWindow.setMaximumSize(800, 1000);
    mainWindow.setMinimumSize(350, 450);

    mainWindow.loadFile('src/connection.html');

    if(debugMode) mainWindow.webContents.openDevTools();
}

ipcMain.on('setWindowPosition', (event, args) => {
    mainWindow.setPosition(args[0], args[1]);

    event.returnValue = null;
});

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
