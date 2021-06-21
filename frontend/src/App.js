import React, { Component } from "react";
import Search from "./custom_components/Search";
import Mapbox from "./custom_components/Mapbox";
import axios from "axios";
import Pannel from "./custom_components/Pannel";

export default class App extends Component {
  state = {
    map: {
      lng: -70.9,
      lat: 42.35,
      zoom: 5,
    },
    markers: [],
    isFetching: true,
    countries: [],
    nextDestination: [],
    selectedValue: "",
  };

  componentDidMount = () => {
    axios
      .get("http://localhost:4000/getCountries")
      .then((res) => {
        this.setState({
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
      markers: this.state.markers.concat(marker),
    });
  };

  onClearMarkers = (map) => {
    const { markers } = this.state;
    for (let index = 0; index < markers.length; index++) {
      markers[index].remove();
    }

    this.setState({
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

  handleCenterChange = (centroid, selected) => {
    this.setState({
      nextDestination: centroid.geometry.coordinates,
      selectedValue: selected,
    });
  };

  handleMarkAsVisited = () => {
    const url = "http://localhost:4000/setVisited/" + this.state.selectedValue;
    axios
      .put(url)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
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
            handleMarkAsVisited={this.handleMarkAsVisited}
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
