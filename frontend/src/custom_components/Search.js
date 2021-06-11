import React from "react";
import TextField from "@material-ui/core/TextField";
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
          onChange={() => {
            alert("selected");
          }}
        />
      </div>
    );
  }
}
