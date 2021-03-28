import React, { useState } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Drawer from "@material-ui/core/Drawer";
import { withStyles } from "@material-ui/core/styles";
import Link from "next/link";
import menuItems from "./menuItems.json";
import { Collapse } from "@material-ui/core";
const styles = {
  list: {
    width: 250,
  },
  links: {
    textDecoration: "none",
  },
  menuHeader: {
    paddingLeft: "30px",
  },
};
const MenuBar = (props) => {
  const [state, setstate] = useState({});

  const handleClick = (item) => {
    let newState = state;
    newState[item] = !newState[item];
    setstate({ ...newState });
  };

  const handler = (children) => {
    const { classes } = props;

    return children.map((subOption, index) => {
      console.log(subOption.children);
      if (!subOption.children) {
        return (
          <div key={`${subOption.name}${index}`}>
            <ListItem button key={subOption.name}>
              <Link href={subOption.url} className={classes.links}>
                <ListItemText inset primary={subOption.name} />
              </Link>
            </ListItem>
          </div>
        );
      }
      return (
        <div key={subOption.name}>
          <ListItem button onClick={() => handleClick(subOption.name)}>
            <ListItemText inset primary={subOption.name} />
            {state[subOption.name] ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={state[subOption.name]} timeout="auto" unmountOnExit>
            {handler(subOption.children)}
          </Collapse>
        </div>
      );
    });
  };

  const { classes, drawerOpen, menuOptions } = props;
  return (
    <div className={classes.list}>
      <Drawer
        variant="persistent"
        anchor="left"
        open
        classes={{ paper: classes.list }}
      >
        <div>
          <List>
            <ListItem key="menuHeading" divider disableGutters>
              <ListItemText
                className={classes.menuHeader}
                inset
                primary="Nested Menu"
              />
            </ListItem>
            {handler(menuItems.data)}
          </List>
        </div>
      </Drawer>
    </div>
  );
};
export default withStyles(styles)(MenuBar);
