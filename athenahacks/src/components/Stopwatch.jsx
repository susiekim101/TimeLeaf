import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import styles from "../css/stopwatch.css";

function Stopwatch({ hobbyId }) {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [currentDayIndex, setCurrentDayIndex] = useState(new Date().getDay()); // Get current day (0-6)

  const intervalIDRef = useRef(null);
  const startTimeRef = useRef(0);

  useEffect(() => {
    if (isRunning) {
      intervalIDRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTimeRef.current);
      }, 10);
    }
    return () => {
      clearInterval(intervalIDRef.current);
    };
  }, [isRunning]);

  function start() {
    setIsRunning(true);
    startTimeRef.current = Date.now() - elapsedTime;
  }

async function stop() {
    setIsRunning(false);
    const timeSpentInSeconds = Math.floor(elapsedTime / 1000); // Convert ms to seconds
  
    // Ensure timeSpent is positive and dayIndex is valid
    if (timeSpentInSeconds <= 0 || currentDayIndex < 0 || currentDayIndex > 6) {
      console.error("Invalid data: Time spent must be positive and day index must be between 0 and 6.");
      return;
    }
  
    try {
      const response = await axios.post(
        `http://localhost:5002/api/hobbies/${hobbyId}/update-time`,
        { timeSpent: timeSpentInSeconds, dayIndices: [currentDayIndex] }, // Send as an array
        { headers: { "Content-Type": "application/json" } } // Ensure correct headers
      );
  
      console.log("Time logged successfully:", response.data);
    } catch (error) {
      console.error("Error updating time:", error.response ? error.response.data : error.message);
    }
  }
  

  function reset() {
    setElapsedTime(0);
    setIsRunning(false);
  }

  function nextDay() {
    setCurrentDayIndex((prevDay) => (prevDay + 1) % 7);
  }

  function formatTime() {
    let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    let minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
    let seconds = Math.floor((elapsedTime / 1000) % 60);

    return `${String(hours).padStart(2, "0")} : ${String(minutes).padStart(2, "0")} : ${String(seconds).padStart(2, "0")}`;
  }

  return (
    <div className="stopwatch">
      <div className="display">{formatTime()}</div>
      <div className="controls">
        <button className="stopwatch-start" onClick={start}>Start</button>
        <button className="stopwatch-stop" onClick={stop}>Stop</button>
        <button className="stopwatch-reset" onClick={reset}>Reset</button>
        <button className="next-day" onClick={nextDay}>Next Day</button>
      </div>
    </div>
  );
}

export default Stopwatch;
