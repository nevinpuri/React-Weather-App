import React from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import MapChart from "./MapChart";
import "./style.css";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

function App() {
  return (
    <div className="App">
      <MapChart />
    </div>
  );
}

export default App;
