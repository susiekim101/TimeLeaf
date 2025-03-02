import React, {useState, useEffect, useRef} from 'react';
import styles from '../css/stopwatch.css';

function Stopwatch({ weeklyTimeSpent, setWeeklyTimeSpent }){

    const [isRunning, setIsRunning] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [currentDayIndex, setCurrentDayIndex] = useState(0);

    const intervalIDRef = useRef(null);
    const startTimeRef = useRef(0);

    useEffect(() => {
        if(isRunning){
            intervalIDRef.current = setInterval(() => {
                setElapsedTime(Date.now() - startTimeRef.current);
            }, 10);
        }

        return () => {
            clearInterval(intervalIDRef.current);
        }
    }, [isRunning]);

    function start(){
        setIsRunning(true);
        startTimeRef.current = Date.now() - elapsedTime;
    }

    function stop(){
        setIsRunning(false);

        // Update weeklyTimeSpent for the current day
        // setWeeklyTimeSpent((prev) => {
        //     const updatedTime = [...prev];
        //     updatedTime[currentDayIndex] += Math.floor(elapsedTime / 1000); // Convert ms to seconds
        //     return updatedTime;
        // });

    }

    function reset(){
        setElapsedTime(0);
        setIsRunning(false);
    }

    function nextDay(){
        setCurrentDayIndex(currentDayIndex + 1);
    }

    function formatTime(){
        let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
        let minutes = Math.floor(elapsedTime / (1000 * 60) % 60);
        let seconds = Math.floor(elapsedTime / (1000) % 60);

        hours = String(hours).padStart(2, '0');
        minutes = String(minutes).padStart(2, '0');
        seconds = String(seconds).padStart(2, '0');
        return `${hours} : ${minutes} : ${seconds}`;
    }

    return(
        <div className="stopwatch">
            <div className="display">{formatTime()}</div>
            <div className="controls">
                <button className="stopwatch-start" onClick={start}>Start</button>
                <button className="stopwatch-stop" onClick={stop}>Stop</button>
                <button className="stopwatch-reset" onClick={reset}>Reset</button>
                <button className = "next-day" onClick={nextDay}>Next Day</button>
                <button className='stopwatch-log'>Log</button>
            </div>
        </div>

    );
}

export default Stopwatch