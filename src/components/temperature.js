import React, { Component } from "react";
import "./temperature.css";


class Temperature extends Component {

    render() {
        let classTypeC = null;
        let classTypeF = null;

        if (this.props.type === "Celcius") {
            classTypeC = "activeColor";
        }
        if (this.props.type === "Fahrenheit") {
            classTypeF = "activeColor";
        }

        let temp = this.props.temp;
        temp = parseInt(temp, 10);

        return (
            <div className="Temperature">
             <div className="Switch">
              <span  className={classTypeF} id="fahrenheit"onClick={this.props.clicked}>{String.fromCharCode(8457)}</span>
              <span>{String.fromCharCode(124)}</span>
              <span className={classTypeC} id="celcius" onClick={this.props.clicked}>{String.fromCharCode(8451)}</span>
             </div>
             <p>{temp}</p>
            </div>
        );
    }
}



export default Temperature;
