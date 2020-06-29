import React, { Component } from "react";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import axios from "axios";
import "./style.css";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const something = [52.16, 4.37];

class MapChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mapLocations: [],
    };
  }

  fetchMapData = () => {
    axios
      .get(
        "https://api.openweathermap.org/data/2.5/find?lat=52.163379199999994&lon=4.3778048&units=metric&appid=7534abbbcc4e9893cbfb5684ef75fb52&cnt=10"
      )
      .then((res) => {
        const {
          data: { list },
        } = res;
        list.map((city) => {
          this.setState({
            mapLocations: [
              ...this.state.mapLocations,
              {
                cityName: city.name,
                cityTemp: city.main.temp,
                coords: [city.coord.lon, city.coord.lat],
                markerOffset: -15,
              },
            ],
          });
        });
        console.log(this.state.mapLocations);
      });
  };

  componentDidMount() {
    this.fetchMapData();
  }

  render() {
    return (
      <div>
        {setTimeout(() => {}, 5000)}
        <Map center={something} zoom={10}>
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={something}>
            <Popup>Nevin</Popup>
          </Marker>
        </Map>
        ;
      </div>
    );
  }
}

export default MapChart;

/*
  fetchMapData = () => {
    axios
      .get(
        "https://api.openweathermap.org/data/2.5/find?lat=52.163379199999994&lon=4.3778048&units=metric&appid=7534abbbcc4e9893cbfb5684ef75fb52&cnt=10"
      )
      .then((res) => {
        const {
          data: { list },
        } = res;
        list.map((city) => {
          this.setState({
            mapLocations: [
              ...this.state.mapLocations,
              {
                cityName: city.name,
                cityTemp: city.main.temp,
                coords: { lat: city.coord.lat, long: city.coord.lon },
              },
            ],
          });
        });
        console.log(this.state.mapLocations);
      });
  };

*/

/*

import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";

  render() {
    return (
      <div>
        <ComposableMap
          projection="geoAzimuthalEqualArea"
          projectionConfig={{ rotate: [-4.3, -52.1, 0], scale: 80000 }}
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#EAEAEC"
                  stroke="#D6D6DA"
                />
              ))
            }
          </Geographies>
          {this.state.mapLocations.map(({ cityName, coords, markerOffset }) => (
            <Marker key={cityName} coordinates={coords}>
              <circle r={4} fill="#1ce206" stroke="#636363" strokeWidth={2} />
              <text
                textAnchor="middle"
                y={markerOffset}
                fontSize="5px"
                style={{ fontFamily: "comic sans ms", fill: "#7662e5" }}
              >
                {cityName}
              </text>
            </Marker>
          ))}
        </ComposableMap>
        <h1>fasdfasdf</h1>
      </div>
    );
  }


*/
