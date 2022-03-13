const { contextBridge, ipcRenderer } = require('electron');

const validChannelsArray = ['ipc-example', 'toggle'];

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    myPing() {
      ipcRenderer.send('ipc-example', 'ping');
    },
    turnHigh() {
      return ipcRenderer.sendSync('toggle', 'high');
    },
    turnLow() {
      return ipcRenderer.sendSync('toggle', 'low');
    },
    on(channel, func) {
      const validChannels = validChannelsArray;
      if (validChannels.includes(channel)) {
        // Deliberately strip event as it includes `sender`
        ipcRenderer.on(channel, (event, ...args) => func(...args));
      }
    },
    once(channel, func) {
      const validChannels = validChannelsArray;
      if (validChannels.includes(channel)) {
        // Deliberately strip event as it includes `sender`
        ipcRenderer.once(channel, (event, ...args) => func(...args));
      }
    },
  },
});
