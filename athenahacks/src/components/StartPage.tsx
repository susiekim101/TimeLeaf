import React from 'react';
import { Link } from 'react-router-dom';
import '../css/startpage.css';

function StartPage() {  

    return(
        <>
            <div className="startpage-container pixelify-sans">
                <h1 className="startpage-title">PassionFinder</h1>
                <Link to="/welcomepage">
                    <button className="start-button pixelify-sans">Start!</button>
                </Link>
            </div>
        </>
    );
}

export default StartPage;