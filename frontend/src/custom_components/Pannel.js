import React from "react";

export default class Pannel extends React.PureComponent {
  render() {
    const countries = this.props.data.map((data) => {
      return (
        <React.Fragment key={data.name}>
          <p>{data.name}</p>
          <hr />
        </React.Fragment>
      );
    });
    return (
      <div>
        <h5>Visited countries:</h5>
        {countries}
      </div>
    );
  }
}
