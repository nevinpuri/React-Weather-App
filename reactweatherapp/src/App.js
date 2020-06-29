import React, { Component } from "react";
import MapChart from "./MapChart";
import "./style.css";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import TempTable from "./TempTable";

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
      backgroundImage: "",
    };
  }

  // function for fetching the mapdata from the openweather api
  // it takes in a lat and lon from the getPos function
  fetchMapData = (lat, lon) => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/find?lat=${lat}&lon=${lon}&units=metric&appid=7534abbbcc4e9893cbfb5684ef75fb52&cnt=50`
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
                cityHumidity: city.main.humidity,
                cityDescription: city.weather[0].description,
                key: uuidv4(),
              },
            ],
          });
        });
        this.setBackgroundImage();
        this.averageCoords();
      });
  };

  setBackgroundImage = () => {
    axios
      .get(
        `https://api.unsplash.com/photos/random/?client_id=zitIfdGC9u1Xjp9vY-rUSdD4wXdEH8_NB-QdK9zkzW0&fm=jpg&crop=entropy&cs=tinysrgb&w=1920&h=1080&fit=max&query=${this.state.mapLocations[0].cityDescription}&orientation=landscape`
      )
      .then((res) => {
        const { data } = res;
        this.setState({ backgroundImage: data.urls.custom });
        console.log(data.urls.custom);
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
        alert(
          "Please allow location. If you keep on getting this error, it means that you are on a browser which either blocks, or does not support location (like waterfox)"
        );
        window.location.reload();
      }
    }, 200);
    this.getCurrentPos();
  }

  render() {
    return (
      !this.state.loading && (
        <div
          className="background-image"
          style={{ backgroundImage: `url(${this.state.backgroundImage})` }}
        >
          <div className="App main-window">
            <header className="header text-center">
              <h1>React Weather App</h1>
            </header>
            <TempTable mapLocations={this.state.mapLocations} />
            <MapChart
              mapLocations={this.state.mapLocations}
              mapPosition={this.state.mapPosition}
            />
          </div>
        </div>
      )
    );
  }
}

export default App;
