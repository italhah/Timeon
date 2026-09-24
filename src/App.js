import React, { useState, useEffect, useRef, useCallback } from 'react';
import NavBar from './components/NavBar';
import Clock from './components/Clock';
import { locations, defaultLocationIndex } from './data/locations';
import './styles/global.css';

function getInitialTheme() {
  const saved = localStorage.getItem('timeon-theme');
  if (saved === 'light' || saved === 'dark') return saved;
  return 'dark';
}

function getFormattedTimeForTimezone(timezone) {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });

  const parts = formatter.formatToParts(now);
  let hours = '12';
  let minutes = '00';
  let seconds = '00';
  let ampm = 'AM';

  for (const part of parts) {
    if (part.type === 'hour') hours = part.value;
    else if (part.type === 'minute') minutes = part.value;
    else if (part.type === 'second') seconds = part.value;
    else if (part.type === 'dayPeriod') ampm = part.value;
  }

  const hourNum = parseInt(hours, 10);
  const displayHours = hourNum < 10 ? `0${hourNum}` : String(hourNum);

  return {
    hours: displayHours,
    minutes,
    seconds,
    ampm,
  };
}

function App() {
  const [theme, setTheme] = useState(getInitialTheme);
  const [selectedIndex, setSelectedIndex] = useState(defaultLocationIndex);
  const [time, setTime] = useState(null);
  const [error, setError] = useState(null);

  const prevTimeRef = useRef(null);
  const timezoneRef = useRef(locations[defaultLocationIndex].timezone);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('timeon-theme', theme);
  }, [theme]);

  const tick = useCallback(() => {
    try {
      const formatted = getFormattedTimeForTimezone(timezoneRef.current);
      prevTimeRef.current = null;
      setTime(formatted);
      setError(null);
    } catch (err) {
      console.error('Error formatting timezone:', err);
      setError('Unable to load time for this location. Please try again.');
    }
  }, []);

  useEffect(() => {
    const location = locations[selectedIndex];
    timezoneRef.current = location.timezone;
    setError(null);
    tick();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      tick();
    }, 1000);
    return () => clearInterval(interval);
  }, [tick]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleLocationChange = (index) => {
    setSelectedIndex(index);
  };

  return (
    <div className="app">
      <NavBar
        selectedIndex={selectedIndex}
        onLocationChange={handleLocationChange}
        isDark={theme === 'dark'}
        onThemeToggle={toggleTheme}
      />
      <main className="app-main">
        {error ? (
          <div className="clock-container">
            <div className="clock-error">{error}</div>
          </div>
        ) : (
          <Clock time={time} prevTime={prevTimeRef.current} />
        )}
      </main>
      <footer className="app-footer">
        Developed by <span className="footer-name">Talha Rahman</span>
      </footer>
    </div>
  );
}

export default App;
