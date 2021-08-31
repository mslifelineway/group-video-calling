import { Button, Grid, Paper, Typography, InputBase } from "@material-ui/core";
import React, { useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import useStyles from "../../styles/dashboard.styles";
import { useHistory, useParams } from "react-router-dom";
import { pagePaths } from "../../utils/constants";
import Layout from "../../components/Layout";

export default function Dashboard() {
  const classes = useStyles();
  const id = useParams().id;
  const history = useHistory();
  const [roomID, setRoomID] = useState(id);
  const [user, setUser] = useState({ name: "Guest" });
  
  const joinRoom = () => {
    if (roomID) {
      return history.push({
        pathname: `${pagePaths.room}/${roomID}`,
        state: { user },
      });
    }
  };
  return (
    <Layout>
      <Grid container className={classes.gridContainer}>
        <Grid item xs={10} sm={5} md={5} lg={3}>
          <Paper className={classes.paper}>
            <Typography variant="h6" gutterBottom>
              Account Info
            </Typography>
            <InputBase
              placeholder="Enter name"
              type="text"
              className={classes.input}
              value={user.name}
              onChange={(e) => {
                setUser({ ...user, name: e.target.value });
              }}
            />
            <CopyToClipboard text={id}>
              <Button variant="contained" color="primary">
                Copy your ID
              </Button>
            </CopyToClipboard>
          </Paper>
        </Grid>
        <Grid item xs={10} sm={5} md={5} lg={3}>
          <Paper className={classes.paper}>
            <Typography variant="h6" gutterBottom>
              Join a meeting
            </Typography>
            <InputBase
              placeholder="Enter ID"
              type="text"
              className={classes.input}
              value={roomID}
              onChange={(e) => {
                setRoomID(e.target.value);
              }}
            />
            <Button variant="contained" color="primary" onClick={joinRoom}>
              JOIN
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Layout>
  );
}
