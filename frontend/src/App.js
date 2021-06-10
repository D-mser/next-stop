import React from "react";
import Search from "./custom_components/Search";
import Pannel from "./custom_components/Pannel";
import Mapbox from "./custom_components/Mapbox";

export default class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      map: {
        lng: -70.9,
        lat: 42.35,
        zoom: 5,
      },
    };
    this.handleMapMove = this.handleMapMove.bind(this);
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

  render() {
    return (
      <div>
        <Search />
        <Pannel />
        <Mapbox map={this.state.map} handleMapMove={this.handleMapMove} />
      </div>
    );
  }
}
