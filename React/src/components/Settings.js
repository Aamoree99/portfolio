import React, { useState } from 'react';
import '../styles/Settings.css';

function Settings({ workTime, breakTime, setWorkTime, setBreakTime, volume, setVolume, isDndEnabled, setDndEnabled, audioPermission, resetTimer, requestAudioPermission }) {
  const [newWorkTime, setNewWorkTime] = useState(workTime / 60);
  const [newBreakTime, setNewBreakTime] = useState(breakTime / 60);

  const setPresetWorkTime = (minutes) => {
    setNewWorkTime(minutes);
    resetTimer(minutes * 60, true); 
  };

  const setPresetBreakTime = (minutes) => {
    setNewBreakTime(minutes);
    resetTimer(minutes * 60, false); 
  };

  const handleWorkTimeChange = () => {
    setWorkTime(newWorkTime * 60);
    resetTimer(newWorkTime * 60, true); 
  };

  const handleBreakTimeChange = () => {
    setBreakTime(newBreakTime * 60);
    resetTimer(newBreakTime * 60, false); 
  };

  return (
    <div className="container">
      <div className="audio-row">
        {!audioPermission ? (
          <button onClick={requestAudioPermission}>Enable Sound</button>
        ) : (
          <div className="buttons">
            <label>Volume: </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => setVolume(e.target.value)}
            />
            <div>
              <label>Do Not Disturb: </label>
              <input
                type="checkbox"
                checked={isDndEnabled}
                onChange={(e) => setDndEnabled(e.target.checked)}
              />
            </div>
          </div>
        )}
      </div>
      <div className="columns-container">
        <div className="column">
          <div className="buttons">
          <label>Work Time: </label>
            <input
              type="number"
              value={newWorkTime}
              onChange={(e) => setNewWorkTime(e.target.value)}
            />
            <label>minutes</label>
            <button onClick={handleWorkTimeChange}>Apply</button>
            <label>Presets:</label>
            <div>
              {[15, 25, 30, 45].map((minutes) => (
                <button key={minutes} onClick={() => setPresetWorkTime(minutes)}>
                  {minutes} min
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="column">
          <div className="buttons">
            <label>Break Time: </label>
            <input
              type="number"
              value={newBreakTime}
              onChange={(e) => setNewBreakTime(e.target.value)}
            />
            <label>minutes</label>
            <button onClick={handleBreakTimeChange}>Apply</button>
            <label>Presets:</label>
            <div>
              {[5, 10, 15].map((minutes) => (
                <button key={minutes} onClick={() => setPresetBreakTime(minutes)}>
                  {minutes} min
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
}

export default Settings;
