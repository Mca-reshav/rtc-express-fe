import { Server, Socket } from "socket.io";
import { Session } from "../models/session.model";
import { eventObj, passiveEventObj } from "./constants";

export const setupSocket = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    console.log("User connected now", socket.id);

    socket.on(eventObj.JOIN, async ({ sessionId, user }) => {
      socket.join(sessionId);

      await Session.updateOne(
        { sessionId },
        {
          $push: {
            users: { ...user, socketId: socket.id, online: true },
          },
        }
      );

      io.to(sessionId).emit(passiveEventObj.JOINED, user);
    });

    //leave
    socket.on(eventObj.LEAVE, async () => {
      await Session.updateMany(
        { "users.socketId": socket.id },
        { $set: { "users.$.online": false } }
      );
    });

    socket.on(eventObj.SEND, async ({ sessionId, message }) => {
      await Session.updateOne(
        { sessionId },
        { $push: { messages: message } }
      );

      io.to(sessionId).emit(passiveEventObj.RECEIVE, message);
    });

    socket.on(eventObj.UPDATE, async ({ sessionId, content }) => {
      await Session.updateOne(
        { sessionId },
        { content }
      );

      socket.to(sessionId).emit(passiveEventObj.UPDATE, content);
    });
  });
};