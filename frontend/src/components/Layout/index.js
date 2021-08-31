import { Box } from "@material-ui/core";
import React from "react";
import Header from "../Header";

export default function Layout(props) {
  return (
    <React.Fragment>
      <Header />
      <Box height="64px" />
      <Box>{props.children}</Box>
    </React.Fragment>
  );
}
