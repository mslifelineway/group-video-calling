import React, { useContext } from "react";
import VideoPlayer from "../../components/VideoPlayer";
import { SocketContext } from "../../Context/socket.context";

export default function RenderPeers() {
  const { peers } = useContext(SocketContext);

  return peers.map((peer) => (
    <VideoPlayer peer={peer} key={peer.peer.channelName} />
  ));
}
