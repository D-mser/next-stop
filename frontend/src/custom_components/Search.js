import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Autocomplete from "@material-ui/lab/Autocomplete";

export default function Search(props) {
  return (
    <div id="search">
      <Autocomplete
        freeSolo
        id="free-solo-2-demo"
        disableClearable
        options={props.data.map((country) => country.name)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search input"
            margin="normal"
            variant="outlined"
            InputProps={{ ...params.InputProps, type: "search" }}
          />
        )}
        onChange={(event, value) => {
          let selectedCountry = props.data.filter(
            (country) => country.name === value
          )[0];
          let turf = require("@turf/turf");
          let polygon = turf.polygon(selectedCountry.location.coordinates);
          let centroid = turf.centroid(polygon);
          props.handleCenterChange(centroid, value);
        }}
      />
      <Button id="search-button" variant="contained" color="primary">
        Search
      </Button>

      <Button
        id="mark-visited-button"
        variant="contained"
        color="primary"
        onClick={props.handleMarkAsVisited}
      >
        Mark as Visited
      </Button>
    </div>
  );
}
