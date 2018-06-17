import React from "react"
import windy from "../assets/cloud-with-wind.png";
import snow from "../assets/snowflake.png";
import fog from "../assets/mist.png";
import rain from "../assets/rain-weather-symbol.png";
import clear from "../assets/sun.png";
import clearNight from "../assets/night.png";
import partCloudyDay from "../assets/cloudy-day-outlined-weather-interface-symbol.png";
import partCloudyNight from "../assets/night-symbol-of-the-moon-with-a-cloud-and-stars.png";
import cloudy from "../assets/small-cloud.png";


import "./icon.css";


const CLEAR = "clear-day";
const CLEAR_Night = "clear-night";
const RAIN = "rain";
const SNOW = "snow";
const WIND = "wind";
const FOG = "fog";
const CLOUDY = "cloudy";
const PART_CLOUDY_DAY = "partly-cloudy-day";
const PART_CLOUDY_NIGHT = "partly-cloudy-night";
//const SLEET = "sleet";


const icon = props => {

    let condition = null;
    switch (props.condition) {

        case RAIN:
            condition = rain;
            break;
        case WIND:
            condition = windy;
            break;
        case FOG:
            condition = fog;
            break;
        case CLEAR:
            condition = clear;
            break;
        case CLEAR_Night:
            condition = clearNight;
            break;
        case PART_CLOUDY_DAY:
            condition = partCloudyDay;
            break;
        case PART_CLOUDY_NIGHT:
            condition = partCloudyNight;
            break;
        case SNOW:
            condition = snow;
            break;
        case CLOUDY:
            condition = cloudy;
            break;
        default:
            condition = clear;
            break;

    }

    return <img alt="weatherIcon" src={condition}/>;

}

export default icon;
