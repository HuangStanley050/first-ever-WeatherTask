import React from "react";
import "./stat.css";

const stat = props => {

    let data = [];
    let newList = [];
    var temp;
    var temp_num;
    for (let stat in props.weather) {
        if (stat === "preci") {
            temp = "precipitation";
            temp_num = props.weather[stat] * 100;
            data.push({ id: temp, value: temp_num + "%" });
        }
        if (stat === "humid") {
            temp = "humidity";
            temp_num = props.weather[stat] * 100;
            data.push({ id: temp, value: temp_num + "%" });
        }
        if (stat === "wind") {
            data.push({ id: stat, value: props.weather[stat] + " km/h" });
        }
    }

    console.log(data);
    newList = data.map(key => {

        return <h2 key={key.id}>{key.id}:{key.value}</h2>;

    });

    return (
        <div>
          <ul>
           { newList }
          </ul>
          <div className="Buttons">
           <button>Temperature</button>
           <button>Precipitation</button>
           <button>Wind</button>
          </div>
        </div>
    )

}

export default stat;
