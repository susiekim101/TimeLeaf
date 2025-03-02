import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../css/HomePage.css';

function HomePage() {
  const [hobbies, setHobbies] = useState([]);

  useEffect(() => {
    const fetchHobbies = async () => {
      try {
        const response = await axios.get('http://localhost:5002/api/hobbies');
        setHobbies(response.data);
      } catch (error) {
        console.error('Error fetching hobbies:', error);
      }
    };

    fetchHobbies();
  }, []);

  return (
    <div className="homepage">
      <h1 className="homepage-h1">My Hobbies</h1>
      <div className="hobby-cards">
        {hobbies.map((hobby) => (
          <Link 
            to={`/tracker/${hobby._id}`} 
            key={hobby._id} 
            className="hobby-link"
          >
            <div className="hobby-card">
              <div className="hobby-card-left">
                {hobby.image && <img src={hobby.image} alt={hobby.name} />}
              </div>

              <div className="hobby-card-right">
                <h2>{hobby.name}</h2>
                <p>Total Time Spent: {hobby.totalTimeSpent} hours</p>
                {/* <p>Notes: {hobby.notes}</p>
                <p>Additional Info: {hobby.additionalInfo}</p> */}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default HomePage;