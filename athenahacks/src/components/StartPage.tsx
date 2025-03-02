import React from 'react';
import { Link } from 'react-router-dom';
import '../css/startpage.css';

function StartPage() {  
    /*const handleClick = () => */
    return(
        <>
            <div className="startpage-container pixelify-sans">
                <img src="athena_owl.png" alt="athena owl" className="startpage-image owl"></img>
                <img src="ballet_shoes.png" alt="ballet shoes" className="startpage-image ballet"></img>
                <div className="startpage-texts">
                    <h1 className="startpage-title">PassionFinder</h1>
                    <Link to="/welcomepage">
                        <button className="startpage-button pixelify-sans-start">Start!</button>
                    </Link>
                </div>
                <img src="basketball.png" alt="basketball" className="startpage-image basketball"></img>
                <img src="brush.png" alt="brush" className="startpage-image brush"></img>
                <img src="camera.png" alt="camera" className="startpage-image camera"></img>
                <img src="piano.png" alt="piano" className="startpage-image piano"></img>
                <img src="Bigstar1.png" alt="bigstar1" className="startpage-image bigstar1"></img>
                <img src="Smallstar1.png" alt="smallstar1" className="startpage-image smallstar1"></img>
                <img src="Bigstar2.png" alt="bigstar2" className="startpage-image bigstar2"></img>
                <img src="Smallstar2.png" alt="smallstar2" className="startpage-image smallstar2"></img>
            </div>
        </>
    );
}

export default StartPage