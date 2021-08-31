import { Grid, Paper, Typography } from "@material-ui/core";
import React, { useEffect, useRef } from "react";
import useStyles from "./styles";

const VideoPlayer = ({ peer }) => {
  const classes = useStyles();
  const ref = useRef();

  useEffect(() => {
    peer.peer.on("stream", (stream) => {
      ref.current.srcObject = stream;
    });
  }, []);

  return (
    <Paper className={classes.paper}>
      <Grid item>
        <Typography variant="h5" gutterBottom>
          {peer.opponentUser ? peer.opponentUser.name : "Guest"}
        </Typography>
        <video playsInline ref={ref} autoPlay className={classes.video} />
      </Grid>
    </Paper>
  );
};

export default VideoPlayer;
