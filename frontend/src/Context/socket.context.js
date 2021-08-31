import { createContext, useRef, useState, useEffect } from "react";
import React from "react";
import Peer from "simple-peer";
import { io } from "socket.io-client";
import { baseUrl } from "../utils/constants";

const SocketContext = createContext();

const socket = io(baseUrl);

const ContextProvider = ({ roomId, user: userDetails, children }) => {
  const [peers, setPeers] = useState([]);
  const socketRef = useRef(null);
  const userVideo = useRef(null);
  const peersRef = useRef([]);
  const [roomID, setRoomID] = useState(roomId);
  const [user, setUser] = useState(userDetails);

  useEffect(() => {
    socketRef.current = socket;
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        userVideo.current.srcObject = stream;
        if (roomID) socketRef.current.emit("join room", { roomID, user });
        socketRef.current.on("all users", (users) => {
          const peers = [];
          users.forEach((obj) => {
            //userID ===> existing room user id (soket.id)
            //socketRef.current.id =>  joining user id
            //stream ===> joining user stream
            const userID = obj.id;
            const opponentUser = obj.user;
            const me = user;
            const peer = createPeer(
              userID,
              socketRef.current.id,
              stream,
              me,
              opponentUser
            );
            peersRef.current.push({
              peerID: userID,
              peer,
            });
            peers.push({ me, opponentUser, peer });
          });
          setPeers(peers);
        });

        socketRef.current.on("user joined", (payload) => {
          const peer = addPeer(
            payload.signal,
            payload.callerID,
            stream,
            payload.me,
            payload.opponentUser
          );
          peersRef.current.push({
            peerID: payload.callerID,
            peer,
          });
          setPeers((users) => [
            ...users,
            { me: payload.me, opponentUser: payload.opponentUser, peer },
          ]);
        });

        socketRef.current.on("receiving returned signal", (payload) => {
          const item = peersRef.current.find((p) => p.peerID === payload.id);
          item.peer.signal(payload.signal);
        });
      })
      .catch((e) => console.log("===> error while opening media : ", e));
  }, []);
  const createPeer = (userToSignal, callerID, stream, me, opponentUser) => {
    const peer = new Peer({ initiator: true, trickle: false, stream });
    //userToSignal => existing room user (one not of all) signal,
    //signal => joining new user signal
    peer.on("signal", (signal) => {
      socketRef.current.emit("sending signal", {
        userToSignal,
        callerID,
        signal,
        me,
        opponentUser,
      });
    });
    return peer;
  };
  const addPeer = (incomingSignal, callerID, stream, me, opponentUser) => {
    //incomingSignal => joining new user signal
    //callerID => joining user id -> socket.id
    const peer = new Peer({ initiator: false, trickle: false, stream });
    peer.on("signal", (signal) => {
      socketRef.current.emit("returning signal", {
        signal,
        callerID,
        me,
        opponentUser,
      });
    });
    peer.signal(incomingSignal);
    return peer;
  };

  return (
    <SocketContext.Provider
      value={{
        roomID,
        peers,
        setRoomID,
        socketRef,
        peersRef,
        userVideo,
        setUser,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext };
