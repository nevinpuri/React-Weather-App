import React, { Component } from "react";
import "./style.css";

class TempTable extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <div>
          <h5 className="text-dark text-center">
            Temperature in {this.props.mapLocations[0].cityName}
          </h5>
        </div>
        <div className="temp-table text-center">
          <table className="table text-center">
            <tbody>
              <tr>
                <th scope="row">Temp</th>
                <td>{this.props.mapLocations[0].cityTemp}</td>
              </tr>
              <tr>
                <th scope="row">Humidity</th>
                <td>{this.props.mapLocations[0].cityHumidity}%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default TempTable;
