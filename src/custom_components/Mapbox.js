import React from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import { MAPBOX_TOKEN } from "../config";

mapboxgl.accessToken = MAPBOX_TOKEN;

export default class Mapbox extends React.PureComponent {
  constructor(props) {
    super(props);
    this.mapContainer = React.createRef();
  }

  componentDidMount() {
    const { lng, lat, zoom } = this.props.map;
    const map = new mapboxgl.Map({
      container: this.mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });

    map.on("move", () => {
      this.props.handleMapMove(map);
    });
  }

  render() {
    const { lng, lat, zoom } = this.props.map;
    return (
      <div>
        <div className="sidebar">
          Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </div>
        <div ref={this.mapContainer} className="map-container" />
      </div>
    );
  }
}
