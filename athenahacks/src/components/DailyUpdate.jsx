import React, { useState, useEffect } from 'react';

const DailyUpdater = ({number}) => {
  // Initialize state to store today's date
  //const [currentDate, setCurrentDate] = useState(new Date().toDateString());
  const [hobby, setHobby] = useState({ aiInfo: "Loading...", weeklyTimeSpent: [] });

  // useEffect hook to update the component when it mounts or when the date changes
  useEffect(() => {
        const fetchHobby = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/hobbies"); 
                const data = await response.json();
    
                if (data.length > 0) {
                    setHobby({
                        aiInfo: data[0].aiInfo || "No Hobby Found",
                        weeklyTimeSpent: data[0].weeklyTimeSpent || [0, 0, 0, 0, 0, 0, 0] // Ensure it's an array
                    });
                }
            } catch (error) {
                console.error("Error fetching hobby:", error);
                setHobby({ aiInfo: "Error loading hobby", weeklyTimeSpent: [0, 0, 0, 0, 0, 0, 0] });
            }
        };
    
        fetchHobby();
    }, []);

  let imageSrc = "";

  // Using if statements to determine the image
  if ( hobby.weeklyTimeSpent &&  hobby.weeklyTimeSpent[number] >= 0 &&  hobby.weeklyTimeSpent[number] < 1) {
    imageSrc = "Bean1.png";
  } else if (hobby.weeklyTimeSpent[number] >= 1 && hobby.weeklyTimeSpent[number] < 2) {
    imageSrc = "Bean2.png";
  } else if (hobby.weeklyTimeSpent[number] >= 3 && hobby.weeklyTimeSpent[number] < 4) {
    imageSrc = "Bean3.png";
  } else if (hobby.weeklyTimeSpent[number] >= 4 && hobby.weeklyTimeSpent[number] < 5){
    imageSrc = "Bean4.png";
  } else {
    imageSrc = "Bean5.png";
  }


  return (
    <div>
      <h1>Today's Date: {currentDate}</h1>
      <p>Stay tuned for the daily update!</p>
      <div className="day">Current Time: {hobby.weeklyTimeSpent[0]} sec <img src={imageSrc} alt="Time-Based Image" width="300" /></div>
    </div>
  );
};

export default DailyUpdater;