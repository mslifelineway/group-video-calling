require("dotenv").config();
const port = process.env.PORT || 8002;
const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http");

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, x-access-token, x-refresh-token, _id"
  );

  res.header(
    "Access-Control-Expose-Headers",
    "x-access-token, x-refresh-token"
  );

  next();
});

const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.set("io", io);
const users = {};

const socketToRoom = {};

io.on("connection", (socket) => {
  socket.on("join room", ({ roomID, user }) => {
    if (users[roomID]) {
      const length = users[roomID].length;
      // if (length === 10) {
      //   socket.emit("room full");
      //   return;
      // }
      users[roomID].push({ id: socket.id, user });
    } else {
      users[roomID] = [{ id: socket.id, user }];
    }
    socketToRoom[socket.id] = roomID;
    const usersInThisRoom = users[roomID].filter((obj) => obj.id !== socket.id);

    socket.emit("all users", usersInThisRoom);
  });

  socket.on("sending signal", (payload) => {
    //exchange user info to opponent here...  ( mandatory and sure)
    io.to(payload.userToSignal).emit("user joined", {
      signal: payload.signal,
      callerID: payload.callerID,
      opponentUser: payload.me,
      me: payload.opponentUser,
    });
  });

  socket.on("returning signal", (payload) => {
    //exchange user info to opponent here... (not mandatory for now but not sure)
    io.to(payload.callerID).emit("receiving returned signal", {
      signal: payload.signal,
      id: socket.id,
      opponentUser: payload.me,
      me: payload.opponentUser,
    });
  });

  socket.on("disconnect", () => {
    const roomID = socketToRoom[socket.id];
    let room = users[roomID];
    if (room) {
      room = room.filter((id) => id !== socket.id);
      users[roomID] = room;
    }
  });
});

server.listen(port, (err) => {
  if (err) {
    console.log("\n--------------------------------------------------");
    console.log("\tserver not started due to : ", err);
    process.exit(1);
  }
  console.log("\n--------------------------------------------------");
  console.log("\tServer is listening on port *" + port);
});
