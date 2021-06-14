import React from "react";
import Search from "./custom_components/Search";
import Mapbox from "./custom_components/Mapbox";
import axios from "axios";
import Pannel from "./custom_components/Pannel";

export default class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      map: {
        lng: -70.9,
        lat: 42.35,
        zoom: 5,
      },
      isFetching: true,
      visitedCountries: [],
      nextDestination: [],
    };
    this.handleMapMove = this.handleMapMove.bind(this);
    this.handleCenterChange = this.handleCenterChange.bind(this);
  }

  componentDidMount() {
    axios
      .get("http://localhost:4000/getVisitedCountries")
      .then((res) => {
        this.setState({
          ...this.state,
          visitedCountries: res.data,
          isFetching: false,
        });
      })
      .catch(function (error) {
        console.log(error);
        this.setState({ ...this.state, isFetching: false });
      });
  }

  handleMapMove(mapObj) {
    this.setState({
      map: {
        lng: mapObj.getCenter().lng.toFixed(4),
        lat: mapObj.getCenter().lat.toFixed(4),
        zoom: mapObj.getZoom().toFixed(2),
      },
    });
  }

  handleCenterChange(centroid) {
    console.log(centroid.geometry.coordinates);
    this.setState({
      ...this.state,
      nextDestination: centroid.geometry.coordinates,
    });
  }

  render() {
    if (!this.state.isFetching) {
      return (
        <div className="grid-container">
          <Search
            data={this.state.visitedCountries}
            handleCenterChange={this.handleCenterChange}
          />
          <Pannel data={this.state.visitedCountries} />
          <Mapbox
            map={this.state.map}
            handleMapMove={this.handleMapMove}
            newCenter={this.state.nextDestination}
            visited={this.state.visitedCountries}
          />
        </div>
      );
    } else {
      return <div>Almost there</div>;
    }
  }
}
