import React, { Component } from "react";
import axios from "axios";
import Location from "../components/location";
import Icon from "../components/icon";
import Stat from "../components/stat";
import Temperature from "../components/temperature";
import "./weather.css";
/*global navigator*/



const apiCall = "https://api.darksky.net/forecast/fedc5ac5f643d1b628fe877199f12aae/";
const proxy = "https://cors-anywhere.herokuapp.com/";
const geoCodingKey = "AIzaSyBreOMm46cS4UgAgR_DF9aZckVn9HrDyRQ";

var long;
var lat;
var suburb;
var postcode;
var state;
var withLocation;

const getPosition = (options) => {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
};

function timeTo12HrFormat(time) { // Take a time in 24 hour format and format it in 12 hour format
    //courtesy of stackoverflow

    var time_part_array = time.split(":");
    var ampm = 'AM';

    if (time_part_array[0] >= 12) {
        ampm = 'PM';
    }

    if (time_part_array[0] > 12) {
        time_part_array[0] = time_part_array[0] - 12;
    }

    var formatted_time = time_part_array[0] + ':' + time_part_array[1] + ':' + time_part_array[2] + ' ' + ampm;

    return formatted_time;
}




//var d = new Date();
//var day = d.getDay();

var day;
switch (new Date().getDay()) {
    case 0:
        day = "Sunday";
        break;
    case 1:
        day = "Monday";
        break;
    case 2:
        day = "Tuesday";
        break;
    case 3:
        day = "Wednesday";
        break;
    case 4:
        day = "Thursday";
        break;
    case 5:
        day = "Friday";
        break;
    case 6:
        day = "Saturday";
        break;
    default:
        break;
}



var time = new Date().toLocaleTimeString();
var new_time = timeTo12HrFormat(time);
time = day + " " + new_time;





class Weather extends Component {

    constructor(props) {
        super(props);
        this.state = {
            suburb: "Loading...",
            postCode: "Loading...",
            state: "loading....",
            time: time,
            temp: "",
            type: "Celcius"
        };
        this.toggleTemp = this.toggleTemp.bind(this);

    }

    componentDidUpdate(prevProps, prevState) {
        //console.log("updated");

        if (prevState.location !== this.state.location) {
            axios.get(proxy + this.state.location) //====weather api call====//
                .then((response) => {
                    this.setState({
                        temp: response.data.currently.temperature,
                        wind: response.data.currently.windSpeed,
                        preci: response.data.currently.precipProbability,
                        humid: response.data.currently.humidity,
                        icon: response.data.currently.icon
                    });
                    return { lat: this.state.lat, long: this.state.long }; //this needs to return for the next api call to get location data
                })
                .then((obj) => {
                    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${obj.lat},${obj.long}&key=${geoCodingKey}`)
                        .then((response) => {
                            suburb = response.data.results[2].address_components[0].long_name; //suburb
                            postcode = response.data.results[2].address_components[response.data.results[2].address_components.length - 1].short_name; //postcode
                            state = response.data.results[2].address_components[2].short_name;
                            console.log(suburb);
                            console.log(postcode);
                            console.log(state);
                            return { post: postcode, suburb: suburb, state: state };
                        })

                        .then((result) => {
                            this.setState({ postCode: result.post, suburb: result.suburb, state: state });
                        })
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        else {
            console.log("componet has been updated already");
        }
    }

    componentWillMount() {
        //console.log("mounted");
        getPosition()
            .then((position) => {
                long = position.coords.longitude;
                lat = position.coords.latitude;
                withLocation = apiCall + lat + "," + long + "?units=si";
                this.setState({ long: long, lat: lat, location: withLocation });
            })
            .catch((err) => {
                console.error(err.message);
            });
    }

    toggleTemp(event) {
        //alert(event.target.id);
        var temperature = this.state.temp;

        if (event.target.id === "celcius") {
            if (this.state.type === "Fahrenheit") {
                temperature = (temperature - 32) * 0.5556;
                this.setState({ temp: temperature, type: "Celcius" });
            }
            //alert("Changed from Fahrenheit to Celcius");
        }

        if (event.target.id === "fahrenheit") {
            if (this.state.type === "Celcius") {
                temperature = (temperature * 1.8) + 32;
                this.setState({ temp: temperature, type: "Fahrenheit" });
            }
            // alert("Changed from Celcius to Fahrenheit");
        }

    }

    render() {
        let data = { ...this.state };

        return (
            <div>
            <div className="Weather">
                <Location postcode={this.state.postCode} state={this.state.state} suburb={this.state.suburb} time={this.state.time} icon={this.state.icon}/>
                <div className="Wrapper">
                 
                 <div className="IconTempWrapper">
                   <Icon condition={this.state.icon}/>
                   <Temperature type={this.state.type} clicked={this.toggleTemp} temp={this.state.temp}/>
                 </div>
                 
                 <div className="StatWrapper">
                   <Stat weather={data}/>
                 </div>
                
                </div>
            </div>
                <h4>Icons courtesy of https://www.flaticon.com/about</h4>
            </div>
        );

    }
}

export default Weather;
