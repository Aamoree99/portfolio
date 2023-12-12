import React, { useState, useEffect, useRef } from 'react';
import TimerDisplay from './TimerDisplay.js';
import Settings from './Settings.js';
import {useLocalStorageEffects} from './useLocalStorageEffects.js'

function App() {
  const initialTimerState = JSON.parse(localStorage.getItem('timerState')) || {
    time: 25 * 60,
    isActive: false,
    isWorkTime: true,
  };

  const [time, setTime] = useState(initialTimerState.time);
  const [isActive, setIsActive] = useState(initialTimerState.isActive);
  const [isWorkTime, setIsWorkTime] = useState(initialTimerState.isWorkTime);

  const [workTime, setWorkTime] = useState(25 * 60);
  const [breakTime, setBreakTime] = useState(5 * 60);

  const [audioPermission, setAudioPermission] = useState(() => {
    const savedAudioPermission = JSON.parse(localStorage.getItem('audioPermission'));
    return savedAudioPermission || false;
  });
  const [isDndEnabled, setDndEnabled] = useState(() => {
    const savedIsDndEnabled = JSON.parse(localStorage.getItem('isDndEnabled'));
    return savedIsDndEnabled || false;
  });
  const [volume, setVolume] = useState(() => {
    const savedVolume = JSON.parse(localStorage.getItem('volume'));
    return savedVolume || 0.5;
  });
  const audioRef = useRef(null);

   useEffect(() => {
    const savedTimerState = JSON.parse(localStorage.getItem('timerState'));
    if (savedTimerState) {
      setTime(savedTimerState.time);
      setIsActive(savedTimerState.isActive);
      setIsWorkTime(savedTimerState.isWorkTime);
    }
  }, []); 

  useEffect(() => {
    let interval = null;
  
    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((time) => time - 1);
      }, 1000); 
    } else if (isActive && time === 0) {
      setIsWorkTime(!isWorkTime);
      setIsActive(false);
      if (audioPermission && !isDndEnabled) {
        audioRef.current.play().catch((error) => console.error('Ошибка воспроизведения аудио:', error));
      }
    } else {
      clearInterval(interval);
    }
  
    return () => clearInterval(interval);
  }, [isActive, time, isWorkTime, isDndEnabled]);

  useEffect(() => {
    if (isWorkTime) {
      setTime((time) => time || workTime);
    } else {
      setTime((time) => time || breakTime);
    }
    audioRef.current.volume = volume;
  }, [workTime, breakTime, isWorkTime, volume, workTime]);
  

  useLocalStorageEffects(audioPermission, setAudioPermission, volume, setVolume, isDndEnabled, setDndEnabled, time, isActive, isWorkTime, setTime, setIsActive, setIsWorkTime);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const requestAudioPermission = () => {
    if (audioRef.current) {
      audioRef.current.play()
        .then(() => {
          setAudioPermission(true);
          audioRef.current.pause();
        })
        .catch((error) => console.error('Ошибка воспроизведения аудио:', error));
    }
  };

  const resetTimer = (newTime = 25 * 60, isWorkTime = true) => {
    setIsActive(false);
    setIsWorkTime(isWorkTime);
    setTime(newTime);
  };
  
  
  

  return (
    <div className="App">
      <div className="timer-container">
        <TimerDisplay
          time={time}
          worktime={workTime}
          breaktime={breakTime}
          isworktime={isWorkTime}
          isActive={isActive}
          toggleTimer={toggleTimer}
        />
      </div>
      <div className="settings-container">
        <Settings
          workTime={workTime}
          breakTime={breakTime}
          setWorkTime={setWorkTime}
          setBreakTime={setBreakTime}
          volume={volume}
          setVolume={setVolume}
          isDndEnabled={isDndEnabled}
          setDndEnabled={setDndEnabled}
          resetTimer={resetTimer}
          audioPermission={audioPermission}
          requestAudioPermission={requestAudioPermission}
        />
      </div>
      <audio ref={audioRef} src="alarm.mp3" preload="auto"></audio>
    </div>
  );
}

export default App;
