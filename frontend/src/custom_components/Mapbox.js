import React, { useRef, useEffect } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import { MAPBOX_TOKEN } from "../config";
import LayersClearIcon from "@material-ui/icons/LayersClear";
import IconButton from "@material-ui/core/IconButton";

mapboxgl.accessToken = MAPBOX_TOKEN;

export default function Mapbox(props) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const { lng, lat, zoom } = props;

  function getFeatures() {
    return props.visited.map((entry) => ({
      type: "Feature",
      geometry: entry.location,
    }));
  }

  function handleFlyToLocation() {
    if (props.newCenter.length > 1) {
      let marker = new mapboxgl.Marker()
        .setLngLat(props.newCenter)
        .addTo(map.current);
      props.handleMarkerUpdate(marker);
      map.current.flyTo({
        center: props.newCenter,
        essential: true,
      });
    }
  }

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/dmser/cktdcwlig182s17qa6qcqgb1d",
      center: [lng, lat],
      zoom: zoom,
      maxZoom: 10,
      minZoom: 2,
    });
  });

  useEffect(() => {
    if (!map.current) return; // initialize map only once

    document
      .getElementById("search-button")
      .addEventListener("click", handleFlyToLocation);

    const features = getFeatures();

    map.current.on("move", () => {
      props.handleMapMove(map.current);
    });
    map.current.on("load", function () {
      map.current.addSource("countries", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: features,
        },
      });

      map.current.addLayer({
        id: "countries",
        type: "fill",
        source: "countries",
        layout: {},
        paint: {
          "fill-color": "#aad8d3",
          "fill-opacity": 0.5,
        },
      });

      map.current.addLayer({
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
  });

  return (
    <div id="map">
      <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div id="custom-control">
        <IconButton onClick={() => props.onClearMarkers(map)}>
          <LayersClearIcon color="primary" fontSize="large" />
        </IconButton>
      </div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
}
