import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    setMode(newMode);
    setHistory((prev) => [...(replace ? prev.slice(0, -1) : prev), newMode]);
  };

  function back() {
    setMode(history[history.length - 2]);
    setHistory((prev) => [...prev].slice(0, -1));
  };

  return { mode, transition, back };
};