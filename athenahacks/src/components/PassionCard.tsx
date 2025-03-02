import React from "react";
import '../css/passioncard.css';

interface Props{
    name: string;
    description: string;
}

function PassionCard({name, description}: Props){

    return (
        <div className="passions-list">
        <div className="passioncard-container">
            <div className="passioncard-name">{name}</div>
            <div className="passioncard-description">{description}</div>
        </div>
        </div>
    );
}

export default PassionCard