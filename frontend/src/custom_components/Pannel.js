import React from "react";
import ExploreIcon from "@material-ui/icons/Explore";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";

export default class Pannel extends React.PureComponent {
  render() {
    return (
      <div id="pannel">
        <List>
          <ListItem>
            <ListItemIcon>
              <ExploreIcon color="primary" fontSize="large" />
              <Typography variant="srOnly">Explored countries</Typography>
            </ListItemIcon>
            <ListItemText
              primary={this.props.count}
              secondary="explored countries"
            />
          </ListItem>
        </List>
      </div>
    );
  }
}
