import React from "react";

interface Props{
    name: string;
    description: string;
}

function PassionCard({name, description}: Props){

    return (
        <>
        <div className="passioncard-container">
            <h1>{name}</h1>
            <h1>{description}</h1>
        </div>
        </>
    );
}

export default PassionCard