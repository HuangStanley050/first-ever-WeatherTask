import React, { Component } from "react";
import axios from "axios";
import Location from "../components/location";
import Icon from "../components/icon";
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
time = day + " " + time;





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
                    return { lat: this.state.lat, long: this.state.long };
                })
                .then((obj) => {
                    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${obj.lat},${obj.long}&key=${geoCodingKey}`)
                        .then(function(response) {
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

    componentDidMount() {
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
        return (
            <div className="Weather">
                <Location postcode={this.state.postCode} state={this.state.state} suburb={this.state.suburb} time={this.state.time} icon={this.state.icon}/>
                <div className="Wrapper">
                 
                 <div className="IconTempWrapper">
                   <Icon condition={this.state.icon}/>
                   <Temperature type={this.state.type} clicked={this.toggleTemp} temp={this.state.temp}/>
                 </div>
                
                </div>
            </div>
        );

    }
}

export default Weather;
