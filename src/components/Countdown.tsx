import { useCallback, useEffect, useMemo, useState } from 'react';
import styles from '../styles/components/Countdown.module.css';

let countdownTimeout: NodeJS.Timeout;

export function Countdown() {
  const [time, setTime] = useState(0.1 * 60);
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  const handleStartCountdown = useCallback(() => {
    setIsActive(state => !state);
    setTime(0.1 * 60);
    if (!isActive) {
      clearTimeout(countdownTimeout);
    }
  }, []);

  const minutes = useMemo(() => {
    return Math.floor(time / 60);
  }, [time]);

  const [minuteLeft, minuteRight] = useMemo(() => {
    return String(minutes).padStart(2, '0').split('');
  }, [minutes]);

  const seconds = useMemo(() => {
    return time % 60;
  }, [time]);

  const [secondLeft, secondRight] = useMemo(() => {
    return String(seconds).padStart(2, '0').split('');
  }, [seconds]);

  useEffect(() => {
    if (isActive && time > 0) {
      countdownTimeout = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    } else if (isActive && time === 0) {
      setIsActive(state => !state);
      setHasFinished(state => !state);
    }
  }, [isActive, time]);

  return (
    <div>
      <div className={styles.countdownContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>

      {hasFinished && (
        <button
          disabled
          className={styles.countdownButton}
        >
          Ciclo encerrado
        </button>
      )}

      <button
        type="button"
        className={`${styles.countdownButton} ${isActive && styles.countdownButtonActive}`}
        onClick={handleStartCountdown}
      >
        {isActive ? 'Abandonar ciclo' : 'Iniciar um ciclo'}
      </button>
    </div>
  );
}
