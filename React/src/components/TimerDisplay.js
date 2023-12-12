import React, {useEffect} from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import '../styles/TimerDisplay.css';

function TimerDisplay({ time, worktime, breaktime, isworktime, isActive, toggleTimer }) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  const percentage = isworktime ? (worktime - time) / worktime : (breaktime - time) / breaktime;

  const progressBarColor = isworktime ? '#00008b' : '#009c00';

  useEffect(() => {
    document.body.style.backgroundColor = isworktime ? '#00498b' : '#b9d9ae';
  }, [isworktime]);

  return (
    <div className={`timer-display ${isworktime ? 'work' : 'break'}`}>
      <div className="timer-progress">
        <CircularProgressbar
          value={percentage * 100}
          text={formattedTime}
          strokeWidth={8}
          styles={buildStyles({
            pathColor: progressBarColor,
            trailColor: 'transparent',
          })}
        />
      </div>
      <button className="toggle-btn" onClick={toggleTimer}>
        {isActive ? 'Pause' : 'Start'}
      </button>
    </div>
  );
}

export default TimerDisplay;
