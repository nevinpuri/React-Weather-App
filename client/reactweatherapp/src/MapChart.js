import React, { Component } from "react";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import "./style.css";

class MapChart extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="main-map border border-secondary">
        <Map center={this.props.mapPosition} zoom={12}>
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {this.props.mapLocations.map((location) => (
            <Marker position={location.coords} key={location.key}>
              <Popup>
                {location.cityName} | {location.cityTemp}
              </Popup>
            </Marker>
          ))}
        </Map>
      </div>
    );
  }
}

export default MapChart;
