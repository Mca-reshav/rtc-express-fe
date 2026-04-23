import { Server, Socket } from "socket.io";
import { Session } from "../models/session.model";
import { eventObj, passiveEventObj } from "./constants";

export const setupSocket = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    console.log("User connected now", socket.id);

    socket.on(eventObj.JOIN, async ({ sessionId, user }) => {
      socket.join(sessionId);

      const session = await Session.findOne({ sessionId });

      if (!session) return;

      const exists = session.users.find((u: any) => u.name === user.name);

      if (!exists) {
        session.users.push({
          ...user,
          socketId: socket.id,
          online: true,
        });
      } else {
        exists.online = true;
        exists.socketId = socket.id;
      }

      await session.save();

      io.to(sessionId).emit(passiveEventObj.PRESENCE, session.users);
      io.to(sessionId).emit(passiveEventObj.RECEIVE, {
        name: "System",
        message: `${user.name} joined`,
      });
    });

    //leave
    socket.on(eventObj.DISCONNECT, async () => {
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

    socket.on(eventObj.LEAVE, async ({ sessionId, name }) => {
      const session = await Session.findOne({ sessionId });
      if (!session) return;
      const user = session.users.find((u: any) => u.name === name);

      if (user)  user.online = false;
      await session.save();
      io.to(sessionId).emit(passiveEventObj.PRESENCE, session.users);
      io.to(sessionId).emit(passiveEventObj.RECEIVE, {
        name: "System",
        message: `${name} left the session`,
      });
    });
  });
};