import React from "react";
import "./location.css";

const location = props => {
    return (
        <div className="Location">
            <h2>{props.suburb+" "+props.state+" "+props.postcode}</h2>
            <h3>{props.time}</h3>
            <h3 className="Condition">{props.icon}</h3>
            </div>
    );
}

export default location;
