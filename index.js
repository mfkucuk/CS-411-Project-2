const { app, BrowserWindow } = require('electron');

const createWindow = () => {
    const win = new BrowserWindow({
        width: 1240,
        height: 720,
        webPreferences: {
            nodeIntegration: true
        },
        icon: 'src/favicon/favicon.ico',
        resizable: false,
    })

    win.loadFile('index.html')
    win.setMenu(null);
}

app.whenReady().then(() => {
    createWindow();
})