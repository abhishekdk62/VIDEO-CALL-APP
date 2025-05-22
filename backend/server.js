const express = require("express");
const cors = require("cors");
const { Server } = require("socket.io");
const http = require("http");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
//?

io.on("connection", (socket) => {
  socket.emit("me", socket.id);
  
  socket.on("disconnect", () => {
    socket.broadcast.emit("callended");
  });

  socket.on("calluser", ({ userToCall, signalData, from, name }) => {
    io.to(userToCall).emit("calluser", { signal: signalData, from, name });
  });

  socket.on("answercall", (data) => {
    // Add name to the callaccepted event
    io.to(data.to).emit("callaccepted", {
      signal: data.signal,
      name: data.name // Make sure name is included
    });
  });
});

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.json("hi");
});

server.listen(PORT, () => {
  console.log(`server started listentning on http://localhost:${PORT}`);
});
