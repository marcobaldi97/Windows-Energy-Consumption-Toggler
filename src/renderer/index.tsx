import { render } from 'react-dom';
import App from './App';

declare global {
  interface Window {
    electron: typeof window.Electron & {
      ipcRenderer: typeof window.Electron.ipcRenderer & {
        turnHigh: () => Promise<boolean>;
        turnLow: () => Promise<boolean>;
        cmd: (commandP: string) => Promise<string>;
      };
    };
  }
}

render(<App />, document.getElementById('root'));
