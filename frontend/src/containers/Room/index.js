import React from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import Layout from "../../components/Layout";
import { pagePaths } from "../../utils/constants";
import MyVideoPlayer from "../../components/VideoPlayer/MyVideoPlayer";
import { ContextProvider } from "../../Context/socket.context";
import RenderPeers from "./RenderPeers";
import useStyles from "../../styles/room.styles";
import { Grid } from "@material-ui/core";

const Room = () => {
  const classes = useStyles();
  const params = useParams();
  const location = useLocation();
  const history = useHistory();
  const { user } = location.state;
  if (!params.id) {
    return history.push(pagePaths.root);
  }

  const contextProps = {
    user,
    roomId: params.id,
  };

  return (
    <Layout>
      <ContextProvider {...contextProps}>
        <Grid container className={classes.gridContainer1}>
          <MyVideoPlayer />
          <RenderPeers />
        </Grid>
      </ContextProvider>
    </Layout>
  );
};

export default Room;
