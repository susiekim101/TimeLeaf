import React, { useState } from 'react';
import axios from 'axios';
import '../css/AddHobby.css';

function AddHobby() {
  const [hobbyName, setHobbyName] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", hobbyName);
    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await axios.post("http://localhost:5002/api/hobbies/add", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      console.log("Hobby added:", response.data);
    } catch (error) {
      console.error("Error adding hobby:", error);
    }
  };

  return (
    <div className="pixelify-sans">
      <h1>Add a New Hobby</h1>
      <form onSubmit={handleSubmit} id="hobby-form">
        <div>
          <label htmlFor="hobbyName">Hobby Name:</label>
          <input
            type="text"
            id="hobbyName"
            value={hobbyName}
            onChange={(e) => setHobbyName(e.target.value)}
            required
          />
        </div>
        <div className="img-upload">
          <label htmlFor="image">Upload Image:</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />
        </div>
        <div className="center-button">
            <button type="submit">Add Hobby</button>
        </div>
       
      </form>
    </div>
  );
}

export default AddHobby;