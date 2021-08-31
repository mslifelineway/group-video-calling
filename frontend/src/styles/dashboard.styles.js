import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  gridContainer: {
    justifyContent: "center",
    [theme.breakpoints.down("xs")]: {
      flexDirectoin: "column",
    },
  },
  paper: {
    padding: "10px",
    margin: "10px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  input: {
    margin: "0 15px",
    marginBottom: "12px",
    padding: "3px 15px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  callEnd: {
    background: "red",
    color: "#fff",
  },
}));
