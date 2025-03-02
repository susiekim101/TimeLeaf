// // import React, {useState, useEffect, useRef} from 'react';
// // import styles from '../css/stopwatch.css';

// // function Stopwatch({ weeklyTimeSpent, setWeeklyTimeSpent }){

// //     const [isRunning, setIsRunning] = useState(false);
// //     const [elapsedTime, setElapsedTime] = useState(0);
// //     const [currentDayIndex, setCurrentDayIndex] = useState(0);

// //     const intervalIDRef = useRef(null);
// //     const startTimeRef = useRef(0);

// //     useEffect(() => {
// //         if(isRunning){
// //             intervalIDRef.current = setInterval(() => {
// //                 setElapsedTime(Date.now() - startTimeRef.current);
// //             }, 10);
// //         }

// //         return () => {
// //             clearInterval(intervalIDRef.current);
// //         }
// //     }, [isRunning]);

// //     function start(){
// //         setIsRunning(true);
// //         startTimeRef.current = Date.now() - elapsedTime;
// //     }

// //     function stop(){
// //         setIsRunning(false);

// //         // Update weeklyTimeSpent for the current day
// //         // setWeeklyTimeSpent((prev) => {
// //         //     const updatedTime = [...prev];
// //         //     updatedTime[currentDayIndex] += Math.floor(elapsedTime / 1000); // Convert ms to seconds
// //         //     return updatedTime;
// //         // });

// //     }

// //     function reset(){
// //         setElapsedTime(0);
// //         setIsRunning(false);
// //     }

// //     function nextDay(){
// //         setCurrentDayIndex(currentDayIndex + 1);
// //     }

// //     function formatTime(){
// //         let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
// //         let minutes = Math.floor(elapsedTime / (1000 * 60) % 60);
// //         let seconds = Math.floor(elapsedTime / (1000) % 60);

// //         hours = String(hours).padStart(2, '0');
// //         minutes = String(minutes).padStart(2, '0');
// //         seconds = String(seconds).padStart(2, '0');
// //         return `${hours} : ${minutes} : ${seconds}`;
// //     }

// //     return(
// //         <div className="stopwatch">
// //             <div className="display">{formatTime()}</div>
// //             <div className="controls">
// //                 <button className="stopwatch-start" onClick={start}>Start</button>
// //                 <button className="stopwatch-stop" onClick={stop}>Stop</button>
// //                 <button className="stopwatch-reset" onClick={reset}>Reset</button>
// //                 <button className = "next-day" onClick={nextDay}>Next Day</button>
// //                 <button className='stopwatch-log'>Log</button>
// //             </div>
// //         </div>

// //     );
// // }

// // export default Stopwatch

// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import styles from "../css/stopwatch.css";

// function Stopwatch({ hobbyId, weeklyTimeSpent, setWeeklyTimeSpent }) {
//   const [isRunning, setIsRunning] = useState(false);
//   const [elapsedTime, setElapsedTime] = useState(0);
//   const [currentDayIndex, setCurrentDayIndex] = useState(new Date().getDay()); // Get current day (0-6)

//   const intervalIDRef = useRef(null);
//   const startTimeRef = useRef(0);

//   useEffect(() => {
//     if (isRunning) {
//       intervalIDRef.current = setInterval(() => {
//         setElapsedTime(Date.now() - startTimeRef.current);
//       }, 10);
//     }
//     return () => {
//       clearInterval(intervalIDRef.current);
//     };
//   }, [isRunning]);

//   function start() {
//     setIsRunning(true);
//     startTimeRef.current = Date.now() - elapsedTime;
//   }

//   async function stop() {
//     setIsRunning(false);
//     const timeSpentInSeconds = Math.floor(elapsedTime / 1000); // Convert ms to seconds

//     try {
//       await axios.post(`http://localhost:5002/api/hobbies/${hobbyId}/update-time`, {
//         timeSpent: timeSpentInSeconds,
//         dayIndex: currentDayIndex
//       });

//       // Update local state
//       setWeeklyTimeSpent((prev) => {
//         const updatedTime = [...prev];
//         updatedTime[currentDayIndex] += timeSpentInSeconds;
//         return updatedTime;
//       });

//       console.log("Time logged successfully");
//     } catch (error) {
//       console.error("Error updating time:", error);
//     }
//   }

//   function reset() {
//     setElapsedTime(0);
//     setIsRunning(false);
//   }

//   function nextDay() {
//     setCurrentDayIndex((prevDay) => (prevDay + 1) % 7);
//   }

//   function formatTime() {
//     let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
//     let minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
//     let seconds = Math.floor((elapsedTime / 1000) % 60);

//     return `${String(hours).padStart(2, "0")} : ${String(minutes).padStart(2, "0")} : ${String(seconds).padStart(2, "0")}`;
//   }

//   return (
//     <div className="stopwatch">
//       <div className="display">{formatTime()}</div>
//       <div className="controls">
//         <button className="stopwatch-start" onClick={start}>Start</button>
//         <button className="stopwatch-stop" onClick={stop}>Stop</button>
//         <button className="stopwatch-reset" onClick={reset}>Reset</button>
//         <button className="next-day" onClick={nextDay}>Next Day</button>
//       </div>
//     </div>
//   );
// }

// export default Stopwatch;

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

    try {
      const response = await axios.post(
        `http://localhost:5002/api/hobbies/${hobbyId}/update-time`,
        { timeSpent: timeSpentInSeconds, dayIndex: currentDayIndex }
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
