import React from "react";
import Search from "./custom_components/Search";
import Mapbox from "./custom_components/Mapbox";
import axios from "axios";
import Pannel from "./custom_components/Pannel";

export default class App extends React.PureComponent {
  state = {
    map: {
      lng: -70.9,
      lat: 42.35,
      zoom: 5,
    },
    isFetching: true,
    countries: [],
    nextDestination: [],
    markers: [],
  };

  componentDidMount = () => {
    axios
      .get("http://localhost:4000/getCountries")
      .then((res) => {
        this.setState({
          ...this.state,
          countries: res.data,
          isFetching: false,
        });
      })
      .catch(function (error) {
        console.log(error);
        this.setState({ ...this.state, isFetching: false });
      });
  };

  handleMarkerUpdate = (marker) => {
    this.setState({
      ...this.state,
      markers: this.state.markers.concat(marker),
    });
  };

  onClearMarkers = (map) => {
    const { markers } = this.state;
    for (let index = 0; index < markers.length; index++) {
      markers[index].remove();
    }

    this.setState({
      ...this.state,
      markers: [],
    });
  };

  handleMapMove = (mapObj) => {
    this.setState({
      map: {
        lng: mapObj.getCenter().lng.toFixed(4),
        lat: mapObj.getCenter().lat.toFixed(4),
        zoom: mapObj.getZoom().toFixed(2),
      },
    });
  };

  handleCenterChange = (centroid) => {
    this.setState({
      ...this.state,
      nextDestination: centroid.geometry.coordinates,
    });
  };

  render() {
    if (!this.state.isFetching) {
      const visited = this.state.countries.filter(
        (country) => country.visited === true
      );
      return (
        <div className="grid-container">
          <Search
            data={this.state.countries}
            handleCenterChange={this.handleCenterChange}
          />
          <Pannel count={visited.length} />
          <Mapbox
            map={this.state.map}
            handleMapMove={this.handleMapMove}
            newCenter={this.state.nextDestination}
            visited={visited}
            handleMarkerUpdate={this.handleMarkerUpdate}
            onClearMarkers={this.onClearMarkers}
          />
        </div>
      );
    } else {
      return <div>Almost there</div>;
    }
  }
}
