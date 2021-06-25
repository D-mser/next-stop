import React, { useEffect, useState } from "react";
import Search from "./custom_components/Search";
import Mapbox from "./custom_components/Mapbox";
import axios from "axios";
import Pannel from "./custom_components/Pannel";

export default function App() {
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(5);
  const [markers, setMarkers] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [countries, setCountries] = useState([]);
  const [nextDestination, setNextDestination] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");

  useEffect(() => {
    if (countries.length) return;
    axios
      .get("http://localhost:4000/getCountries")
      .then((res) => {
        setCountries((prevCountries) => prevCountries.concat(res.data));
        setIsFetching(false);
      })
      .catch(function (error) {
        console.log(error);
        setIsFetching(false);
      });
  });

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

  if (!isFetching) {
    const visited = countries.filter((country) => country.visited === true);
    return (
      <div className="grid-container">
        <Search
          data={countries}
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
  } else {
    return <div>Almost there</div>;
  }
}
