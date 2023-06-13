const express = require("express");
const { PORT } = require("./config");
const { databaseConnection } = require("./database");
const expressApp = require("./express-app");
const socketio = require("socket.io");
const http = require("http");

const StartServer = async () => {
  const app = express();

  await databaseConnection();

  await expressApp(app);

  let users = [];
  const server = http.createServer(app);

  const io = socketio(server, {
    cors: {
      origin: "*",
    },
    path: "/ws/",
  });

  io.on("connection", (socket) => {
    console.log("User connected", socket.id);

    socket.on("setSocketId", (idUser) => {
      users[idUser] = socket.id;
    });

    socket.on("dorescTransport", (msg) => {
      const data = {
        idExpeditor: msg.idExpeditor,
        idTransportator: msg.idTransportator,
        transport: msg.transport,
      };
      let socketId = users[data.idExpeditor];
      socket.to(socketId).emit("ofertaTransport", data);
    });

    socket.on("respingereTransportator", (resping) => {
      idTransportator = resping.idTransportator;
      let socketId = users[idTransportator];
      socket.to(socketId).emit("respingere", resping);
    });

    socket.on("acceptaTrasnport", (accepta) => {
      idTransportator = accepta.idTransportator;
      let socketId = users[idTransportator];
      socket.to(socketId).emit("acceptare", accepta);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected", socket.id);

      // Eliminarea intrării din users când clientul se deconectează
      const userId = Object.keys(users).find((key) => users[key] === socket.id);
      if (userId) {
        delete users[userId];
        console.log("User removed from users:", userId);
      }
    });
  });

  // server.listen(PORT, () => {
  //   console.log(`listening to port ${PORT}`);
  // });

  server
    .listen(PORT, () => {
      console.log(`listening to port ${PORT}`);
    })
    .on("error", (err) => {
      console.log(err);
      process.exit();
    })
    .on("close", () => {
      channel.close();
    });
};

StartServer();
