import { useEffect } from 'react';

export const useLocalStorageEffects = (audioPermission, setAudioPermission, volume, setVolume, isDndEnabled, setDndEnabled, time, isActive, isWorkTime, setTime, setIsActive, setIsWorkTime) => {
    useEffect(() => {
        localStorage.setItem('audioPermission', JSON.stringify(audioPermission));
      }, [audioPermission]);
      
      useEffect(() => {
        localStorage.setItem('volume', JSON.stringify(volume));
      }, [volume]);
      
      useEffect(() => {
        localStorage.setItem('isDndEnabled', JSON.stringify(isDndEnabled));
      }, [isDndEnabled]);
      
      useEffect(() => {
        const timerState = { time, isActive, isWorkTime };
        localStorage.setItem('timerState', JSON.stringify(timerState));
      }, [time, isActive, isWorkTime]);

      useEffect(() => {
        const savedAudioPermission = JSON.parse(localStorage.getItem('audioPermission'));
        if (savedAudioPermission != null) setAudioPermission(savedAudioPermission);
      
        const savedVolume = JSON.parse(localStorage.getItem('volume'));
        if (savedVolume != null) setVolume(savedVolume);
      
        const savedIsDndEnabled = JSON.parse(localStorage.getItem('isDndEnabled'));
        if (savedIsDndEnabled != null) setDndEnabled(savedIsDndEnabled);
      
        const savedTimerState = JSON.parse(localStorage.getItem('timerState'));
        if (savedTimerState) {
          setTime(savedTimerState.time);
          setIsActive(savedTimerState.isActive);
          setIsWorkTime(savedTimerState.isWorkTime);
        }
      }, []);   
};