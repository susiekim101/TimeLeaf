import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Stopwatch from "./Stopwatch";
import Notes from "./Notes";
import "../css/Tracker.css";

const Tracker = () => {
    const { hobbyId } = useParams();
    const [hobby, setHobby] = useState({ 
      name: "Loading...",
      aiInfo: "Loading...", 
      weeklyTimeSpent: [0, 0, 0, 0, 0, 0, 0],
      totalTimeSpent: 0,
      notes: "",
      additionalInfo: "" 
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      const fetchHobbyData = async () => {
        try {
          setLoading(true);
          console.log(`Fetching hobby data for ID: ${hobbyId}`);
          const response = await fetch(`http://localhost:5002/api/hobbies/${hobbyId}`);
          
          if (!response.ok) {
            throw new Error(`Failed to fetch hobby data: ${response.status}`);
          }
          
          const data = await response.json();
          console.log("Received hobby data:", data);
          
          setHobby({
            name: data.name || "Unnamed Hobby",
            aiInfo: data.aiInfo || "",
            weeklyTimeSpent: data.weeklyTimeSpent || [0, 0, 0, 0, 0, 0, 0],
            totalTimeSpent: data.totalTimeSpent || 0,
            notes: data.notes || "",
            additionalInfo: data.additionalInfo || ""
          });
          setLoading(false);
        } catch (error) {
          console.error("Error fetching hobby:", error);
          setError("Error loading hobby data. Please try again later.");
          setLoading(false);
        }
      };
  
      if (hobbyId) {
        fetchHobbyData();
      }
    }, [hobbyId]);

    /*
    const minutesToHours = (minutes) => {
      return (minutes / 60).toFixed(1);
    };*/

    // Function to determine which Bean image to use based on hours
    const getBeanImage = (weeklyTimeSpent) => {
      /*// Convert minutes to hours for the Bean image logic
      const hours = minutes / 60;*/
      
      if (weeklyTimeSpent >= 0 && weeklyTimeSpent < 2) {
        return "/Bean1.png";
      } else if (weeklyTimeSpent >= 2 && weeklyTimeSpent < 4) {
        return "/Bean2.png";
      } else if (weeklyTimeSpent >= 4 && weeklyTimeSpent < 6) {
        return "/Bean3.png";
      } else if (weeklyTimeSpent >= 6 && weeklyTimeSpent < 8) {
        return "/Bean4.png";
      } else {
        return "/Bean5.png";
      }
    };

    if (loading) {
      return <div className="loading">Loading hobby data...</div>;
    }

    if (error) {
      return <div className="error">{error}</div>;
    }

    // Calculate total weekly seconds (but we'll display as if they were hours)
    const totalWeeklySeconds = hobby.weeklyTimeSpent.reduce((sum, seconds) => sum + seconds, 0);

    return (
      <div className="tracker-container">
        <h1 className="tracker-title">{hobby.name}</h1>

        <div className="tracker-grid">
          <div className="tracker-card info-card">
            <h2 className="card-title">Info</h2>
            <div className="info-content">
              {hobby.aiInfo ? (
                <p>{hobby.aiInfo}</p>
              ) : (
                <ul>
                  <li>link</li>
                  <li>resources</li>
                  <li>more stuff</li>
                </ul>
              )}
              {hobby.additionalInfo && (
                <div className="additional-info">
                  <h3>Additional Information</h3>
                  <p>{hobby.additionalInfo}</p>
                </div>
              )}
            </div>
          </div>

          <div className="tracker-card stopwatch-card small-card">
            <h2 className="card-title">Stopwatch</h2>
            <Stopwatch hobbyId={hobbyId} />
          </div>

          <div className="tracker-card notes-card small-card">
            <h2 className="card-title">Notes</h2>
            <Notes hobbyId={hobbyId} initialNotes={hobby.notes} />
          </div>

          {/* Weekly Tracker */}
          <div className="tracker-card weekly-tracker">
            <h2 className="card-title">Weekly Tracker</h2>
            <div className="tracker-week">
              {hobby.weeklyTimeSpent && hobby.weeklyTimeSpent.map((seconds, index) => {
                const day = ["mon", "tues", "wed", "thur", "fri", "sat", "sun"][index];
                const beanImage = getBeanImage(seconds);
                
                return (
                  <div className="day" key={index}>
                    {day} 
                    <img 
                      src={beanImage} 
                      alt={`Bean representing hours`} 
                      className="day-bean"
                      width="30" 
                    />
                    {/* For demo: display seconds as if they were hours */}
                    <p>{seconds}h</p>
                  </div>
                );
              })}
              <div className="day current-time">
                Current Week: {hobby.totalTimeSpent}h
                <img 
                  src={getBeanImage(totalWeeklySeconds)} 
                  alt="Weekly Bean" 
                  width="100" 
                  className="weekly-bean"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Images */}
        <img src="/Bird.png" alt="Athena Bird" className="tracker-bird" />
        <img src="/Bigstar.png" alt="Sparkles" className="tracker-sparkles sparkles-1" />
        <img src="/Bigstar.png" alt="Sparkles" className="tracker-sparkles sparkles-2" />
        <img src="/Bigstar.png" alt="Sparkles" className="tracker-sparkles sparkles-3" />
        <img src="/Bigstar.png" alt="Sparkles" className="tracker-sparkles sparkles-4" />
      </div>
    );
};

export default Tracker;