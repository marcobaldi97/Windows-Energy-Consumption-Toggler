import React, { useState } from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

const Content: React.FunctionComponent = (props) => {
  const [selectedProfile, setSelectedProfile] = useState<string | undefined>(
    undefined
  );

  async function onClickHandler(profile: 'high' | 'low') {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { ipcRenderer } = window.electron;

    if (ipcRenderer) {
      let response = false;

      switch (profile) {
        case 'high':
          response = await ipcRenderer.turnHigh();
          if (response) setSelectedProfile(profile);
          break;

        case 'low':
          response = await ipcRenderer.turnLow();
          if (response) setSelectedProfile(profile);
          break;

        default:
          break;
      }
    }
  }

  return (
    <div>
      <h1>Windows Energy Consumption Toggler</h1>
      <div className="buttons-group">
        <button
          name="HighEnergy"
          type="button"
          onClick={() => onClickHandler('high')}
        >
          High Energy
        </button>
        <button
          name="LowEnergy"
          type="button"
          onClick={() => onClickHandler('low')}
        >
          Low Energy
        </button>
      </div>
      {selectedProfile && (
        <h2>
          Selected profile:{' '}
          <p style={{ fontStyle: 'italic' }}>{selectedProfile}</p>
        </h2>
      )}
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Content />} />
      </Routes>
    </Router>
  );
}
