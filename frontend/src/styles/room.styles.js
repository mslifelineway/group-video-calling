import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  gridContainer1: {
    display: "grid",
    gridTemplateColumns: `repeat(auto-fill, 30%)`,
    justifyContent: "center",
    padding: "20px",
    gridGap: "20px",
    [theme.breakpoints.down("sm")]: {
      gridTemplateColumns: `repeat(auto-fill, 49%)`,
    },
    [theme.breakpoints.down("xs")]: {
      gridTemplateColumns: `repeat(auto-fill, 98%)`,
    },
  },
}));
