import React, { useEffect, useState } from 'react';

import './Content.css';

export type EnergyProfile = { id: string; value: string; selected: boolean };

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function Content(props: unknown) {
  const [energyProfiles, setEnergyProfiles] = useState<EnergyProfile[]>([]);

  async function getEnergyProfiles(): Promise<Array<EnergyProfile>> {
    const { ipcRenderer } = window.electron;

    const profiles: string = await ipcRenderer.cmd('powercfg -list');

    return (
      profiles.split('\n').flatMap((profile: string, line: number) => {
        if (line > 2) {
          return {
            id:
              profile.match(
                /[0-9a-f]*-[0-9a-f]*-[0-9a-f]*-[0-9a-f]*-[0-9a-f]*/gm
              )?.[0] ?? '',
            value:
              profile
                .match(/\(\D*\)/gm)?.[0]
                .replace(/\(/, '')
                .replace(/\)/, '') ?? '',
            selected: profile.search(/\*/) !== -1,
          };
        }
        return [];
      }) ?? []
    );
  }

  useEffect(() => {
    getEnergyProfiles()
      .then((result) => setEnergyProfiles(result))
      .catch((err) => console.error(err));
  }, []);

  async function onClickHandler(profile: string) {
    const { cmd } = window.electron.ipcRenderer;

    await cmd(`powercfg -setactive ${profile}`);

    getEnergyProfiles()
      .then((result) => setEnergyProfiles(result))
      .catch((err) => console.error(err));
  }

  return (
    <div>
      <h1>Windows Energy Consumption Toggler</h1>
      <div className="buttons-group">
        {energyProfiles.map(
          (profile) =>
            profile.id && (
              <button
                key={profile.id}
                className={`button ${
                  profile.selected ? 'button-selected' : ''
                }`}
                onClick={() => onClickHandler(profile.id)}
                type="button"
              >
                {profile.value}
              </button>
            )
        )}
      </div>
    </div>
  );
}
