 import { useState } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  
  const transition = (newMode, replace = false) => {
    if (replace) {
      setHistory(prev => [...prev.slice(0, prev.length - 1), newMode]);
    } else {
      setHistory([...history, newMode]);
    }
    setMode(newMode);
  }
  function back() {
    if(history.length > 1) {
      setHistory(history.slice(0, history.length - 1));
      setMode(history[history.length - 2]);
    } else if (history.length === 1) {
      setMode(initial);
    }
  }

  return { mode, transition, back };
};
