import React, { Component } from "react";
import axios from "axios";
import Location from "../components/location";
import "./weather.css";
/*global navigator*/

//"https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key="

/*navigator.geolocation.getCurrentPosition((position) => {
    long = position.coords.longitude;
    lat = position.coords.latitude;
    withLocation = apiCall + lat + "," + long;
    //this.setState({ long: long });

});*/

/*
async function waitForPromise() {
        let result = await Promise.resolve('this is a sample promise');
    }

*/

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

var d = new Date();
var day = d.getDay();
var time = new Date().toLocaleTimeString();
time = day + " " + time;





class Weather extends Component {

    constructor(props) {
        super(props);
        this.state = {
            suburb: null,
            postCode: null,
            time: time
        };

    }

    componentDidUpdate(prevProps, prevState) {
        console.log("updated");

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
                            return { post: postcode, suburb: suburb };
                        })

                        .then((result) => {
                            this.setState({ postCode: result.post, suburb: result.suburb });
                        })
                })
                .catch((error) => {
                    console.log(error);
                });
        }

        /*if (prevState.suburb == null) {
            axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${geoCodingKey}`)
                .then(function(response) {
                    suburb = response.data.results[2].address_components[0].long_name; //suburb
                    postcode = response.data.results[2].address_components[response.data.results[2].address_components.length - 1].short_name; //postcode
                    state = response.data.results[2].address_components[2].short_name;
                    console.log(suburb);
                    console.log(postcode);
                    console.log(state);
                    this.setState({ suburb: suburb, postCode: postcode });
                })
                .catch(function(error) {
                    console.log(error);
                });
        }*/
        else {
            console.log("componet has been updated already");
        }
    }



    componentDidMount() {
        console.log("mounted");
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





        /*axios.get(proxy + this.state.withLocation) //====weather api call====//
                            .then((response) => {
                                console.log(response);
                            })
                            .catch((error) => {
                                console.log(error);
                            });
                        /*
        
                        //====google map api call====//
                        axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${geoCodingKey}`)
                                .then(function(response) {
                                    suburb = response.data.results[2].address_components[0].long_name; //suburb
                                    postcode = response.data.results[2].address_components[response.data.results[2].address_components.length - 1].short_name; //postcode
                                    console.log(suburb);
                                    console.log(postcode)
                                    this.setState({ suburb: suburb, postCode: postcode });
                                })
                                .catch(function(error) {
                                    console.log(error);
                                });

                         */




    }

    render() {
        return (
            <div className="Weather">
                <Location/>
                <div className="Wrapper">
                </div>
            </div>
        );

    }
}

export default Weather;
