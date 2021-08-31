import { AppBar, Toolbar, Typography } from "@material-ui/core";
import React from "react";
import useStyles from "./styles";

export default function Header(props) {
  const classes = useStyles();

  return (
    <AppBar className={classes.root} position="fixed">
      <Toolbar variant="dense" className={classes.toolbar}>
        <Typography variant="h6" color="inherit">
          VIDEO CALLING APP
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
