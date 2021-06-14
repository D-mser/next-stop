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
      countries: [],
      nextDestination: [],
    };
    this.handleMapMove = this.handleMapMove.bind(this);
    this.handleCenterChange = this.handleCenterChange.bind(this);
  }

  componentDidMount() {
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
      const visited = this.state.countries.filter(
        (country) => country.visited === true
      );
      console.log(visited);
      return (
        <div className="grid-container">
          <Search
            data={this.state.countries}
            handleCenterChange={this.handleCenterChange}
          />
          <Pannel data={visited} />
          <Mapbox
            map={this.state.map}
            handleMapMove={this.handleMapMove}
            newCenter={this.state.nextDestination}
            visited={visited}
          />
        </div>
      );
    } else {
      return <div>Almost there</div>;
    }
  }
}
