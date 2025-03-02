import React, { useState } from "react";
import "../css/Notes.css";
const Notes = () => {
  const [text, setText] = useState("");

  return (
    <div className="notes-container">
      <textarea
        className="notes-textarea"
        placeholder="Type your notes here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </div>
  );
};

export default Notes;
