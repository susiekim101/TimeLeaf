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
          const response = await fetch(`http://localhost:5002/api/hobbies/${hobbyId}`);
          
          if (!response.ok) {
            throw new Error("Failed to fetch hobby data");
          }
          
          const data = await response.json();
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

    // Determine which bean image to display based on time spent
    let imageSrc = "";
    if (hobby.weeklyTimeSpent && hobby.weeklyTimeSpent[0] >= 0 && hobby.weeklyTimeSpent[0] < 15) {
      imageSrc = "Bean1.png";
    } else if (hobby.weeklyTimeSpent[0] >= 15 && hobby.weeklyTimeSpent[0] < 30) {
      imageSrc = "Bean2.png";
    } else if (hobby.weeklyTimeSpent[0] >= 30 && hobby.weeklyTimeSpent[0] < 45) {
      imageSrc = "Bean3.png";
    } else if (hobby.weeklyTimeSpent[0] >= 45 && hobby.weeklyTimeSpent[0] < 60){
      imageSrc = "Bean4.png";
    } else {
      imageSrc = "Bean5.png";
    }

    if (loading) {
      return <div className="loading">Loading hobby data...</div>;
    }

    if (error) {
      return <div className="error">{error}</div>;
    }

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
              {hobby.weeklyTimeSpent && hobby.weeklyTimeSpent.map((time, index) => {
                const day = ["mon", "tues", "wed", "thur", "fri", "sat", "sun"][index];
                const emoji = time > 0 ? "😊" : "😞";
                const hours = Math.floor(time / 3600); // Convert seconds to hours
                
                return (
                  <div className="day" key={index}>
                    {day} <span>{emoji}</span> <p>{hours}h</p>
                  </div>
                );
              })}
              <div className="day">
                Current Time: {hobby.weeklyTimeSpent[0]} sec 
                <img src={imageSrc} alt="Time-Based Image" width="300" />
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