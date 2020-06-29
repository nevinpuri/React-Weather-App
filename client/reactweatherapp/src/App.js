import React, { Component } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import MapChart from "./MapChart";
import "./style.css";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mapLocations: [],
      mapPosition: [],
      loading: true, // used a loading state so that map loads only after fetch request is done
      getPos: false, // used a getPos state to check if the user has location available. If the user was on a browser like waterfox, the lat and long vars would be undefined
    };
  }

  // function for fetching the mapdata from the openweather api
  // it takes in a lat and lon from the getPos function
  fetchMapData = (lat, lon) => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/find?lat=${lat}&lon=${lon}&units=metric&appid=7534abbbcc4e9893cbfb5684ef75fb52&cnt=10`
      )
      .then((res) => {
        const {
          data: { list },
        } = res;
        list.map((city) => {
          // for each object in the array, append it to the mapLocations state
          this.setState({
            mapLocations: [
              ...this.state.mapLocations,
              {
                cityName: city.name,
                cityTemp: city.main.temp,
                coords: [city.coord.lat, city.coord.lon],
                markerOffset: -15,
                key: uuidv4(),
              },
            ],
          });
        });
        this.averageCoords();
      });
  };

  averageCoords = () => {
    let answer = [0, 0];

    this.state.mapLocations.map((location) => {
      let { coords } = location;
      answer[0] += coords[0];
      answer[1] += coords[1];
    });

    answer[0] = answer[0] / this.state.mapLocations.length;
    answer[1] = answer[1] / this.state.mapLocations.length;
    this.setState({ mapPosition: [answer[0], answer[1]] });
  };

  getCurrentPos = () => {
    if ("geolocation" in navigator) {
      // check if user has geolocation enabled
      navigator.geolocation.getCurrentPosition((pos) => {
        this.setState({ getPos: true }); // set state of both the mapPos and mapPosition
        this.fetchMapData(pos.coords.latitude, pos.coords.longitude); // fetch map data
      });
    } else {
      alert("Please enable location");
    }
  };

  componentDidMount() {
    setTimeout(() => {
      // set a timeout to allow the openweather api to respond with data
      if (this.state.getPos === true) this.setState({ loading: false });
      // check if location is valid
      else {
        alert("Please allow location");
        window.location.reload();
      }
    }, 150);
    this.getCurrentPos();
  }

  render() {
    return (
      !this.state.loading && (
        <div className="App">
          <MapChart
            mapLocations={this.state.mapLocations}
            mapPosition={this.state.mapPosition}
          />
        </div>
      )
    );
  }
}

export default App;
