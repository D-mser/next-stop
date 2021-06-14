import React from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import { MAPBOX_TOKEN } from "../config";

mapboxgl.accessToken = MAPBOX_TOKEN;
let map = "";

export default class Mapbox extends React.PureComponent {
  constructor(props) {
    super(props);
    this.mapContainer = React.createRef();
    this.getFeatures = this.getFeatures.bind(this);
    this.handleFlyToLocation = this.handleFlyToLocation.bind(this);
  }

  getFeatures() {
    return this.props.visited.map((entry) => ({
      type: "Feature",
      geometry: entry.location,
    }));
  }

  handleFlyToLocation() {
    if (this.props.newCenter.length > 1) {
      map.flyTo({
        center: this.props.newCenter,
        essential: true,
      });
    }
  }

  componentDidMount() {
    const { lng, lat, zoom } = this.props.map;
    map = new mapboxgl.Map({
      container: this.mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
      maxZoom: 10,
      minZoom: zoom,
    });

    const features = this.getFeatures();

    document
      .getElementById("search-button")
      .addEventListener("click", this.handleFlyToLocation);

    map.on("move", () => {
      this.props.handleMapMove(map);
    });
    map.on("load", function () {
      map.addSource("countries", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: features,
        },
      });

      map.addLayer({
        id: "countries",
        type: "fill",
        source: "countries",
        layout: {},
        paint: {
          "fill-color": "#aad8d3",
          "fill-opacity": 0.5,
        },
      });

      map.addLayer({
        id: "outline",
        type: "line",
        source: "countries",
        layout: {},
        paint: {
          "line-color": "#00adb5",
          "line-width": 2,
        },
      });
    });
  }

  render() {
    const { lng, lat, zoom } = this.props.map;
    return (
      <div id="map">
        <div className="sidebar">
          Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </div>
        <div ref={this.mapContainer} className="map-container" />
      </div>
    );
  }
}
