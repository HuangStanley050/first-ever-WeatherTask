import React, { Component } from "react";
import "./temperature.css";


class Temperature extends Component {
    state = {

    }

    render() {
        let temp = this.props.temp;
        temp = parseInt(temp, 2);
        return (
            <div className="Temperature">
             <p>{temp}</p>
            </div>
        );
    }
}

export default Temperature;
