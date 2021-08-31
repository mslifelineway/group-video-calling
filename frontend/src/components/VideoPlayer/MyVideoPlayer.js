import { Grid, Paper, Typography } from "@material-ui/core";
import React, { useContext } from "react";
import { SocketContext } from "../../Context/socket.context";
import useStyles from "./styles";

const MyVideoPlayer = () => {
  const classes = useStyles();
  const { userVideo } = useContext(SocketContext);
  return (
    <Paper className={classes.paper1}>
      <Grid item>
        <Typography variant="h5" gutterBottom>
          {"YOU"}
        </Typography>
        <video
          playsInline
          muted
          ref={userVideo}
          autoPlay
          className={classes.video}
        />
      </Grid>
    </Paper>
  );
};

export default MyVideoPlayer;
