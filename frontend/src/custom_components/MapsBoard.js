import React, { useState, useContext } from "react";
import Search from "./Search";
import Mapbox from "./Mapbox";
import axios from "axios";
import Pannel from "./Pannel";
import { DataContext } from "../DataContext";

export default function MapsBoard() {
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(5);
  const [markers, setMarkers] = useState([]);
  const { data } = useContext(DataContext);
  const [nextDestination, setNextDestination] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");

  function handleMarkerUpdate(marker) {
    setMarkers((prevMarkers) => prevMarkers.concat(marker));
  }

  function onClearMarkers(map) {
    for (let index = 0; index < markers.length; index++) {
      markers[index].remove();
    }

    setMarkers([]);
  }

  function handleMapMove(map) {
    setLng(map.getCenter().lng.toFixed(4));
    setLat(map.getCenter().lat.toFixed(4));
    setZoom(map.getZoom().toFixed(2));
  }

  function handleCenterChange(centroid, selected) {
    setNextDestination(centroid.geometry.coordinates);
    setSelectedValue(selected);
  }

  function handleMarkAsVisited() {
    const url = "http://localhost:4000/setVisited/" + selectedValue;
    axios
      .put(url)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const visited = data.filter((country) => country.visited === true);
  return (
    <div className="grid-container">
      <Search
        data={data}
        handleCenterChange={handleCenterChange}
        handleMarkAsVisited={handleMarkAsVisited}
      />
      <Pannel count={visited.length} />
      <Mapbox
        lat={lat}
        lng={lng}
        zoom={zoom}
        handleMapMove={handleMapMove}
        newCenter={nextDestination}
        visited={visited}
        handleMarkerUpdate={handleMarkerUpdate}
        onClearMarkers={onClearMarkers}
      />
    </div>
  );
}
