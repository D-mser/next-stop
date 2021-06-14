import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Autocomplete from "@material-ui/lab/Autocomplete";

export default class Search extends React.PureComponent {
  render() {
    return (
      <div id="search">
        <Autocomplete
          freeSolo
          id="free-solo-2-demo"
          disableClearable
          options={this.props.data.map((country) => country.name)}
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
            let selectedCountry = this.props.data.filter(
              (country) => country.name === value
            )[0];
            let turf = require("@turf/turf");
            let polygon = turf.polygon(selectedCountry.location.coordinates);
            let centroid = turf.centroid(polygon);
            this.props.handleCenterChange(centroid);
          }}
        />
        <Button id="search-button" variant="contained" color="primary">
          Search
        </Button>
      </div>
    );
  }
}
