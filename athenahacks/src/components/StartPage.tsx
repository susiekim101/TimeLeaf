import React from 'react'
import '../css/startpage.css'

function StartPage() {  
      
    return(
        <>
            <div className="startpage-container pixelify-sans">
                <h1 className="startpage-title">PassionFinder</h1>
                <button className="start-button pixelify-sans">Start!</button>
            </div>
        </>
    );
}

export default StartPage