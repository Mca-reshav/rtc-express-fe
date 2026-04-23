import { Request, Response } from "express";
import { Session } from "../models/session.model";
import { v4 as uuidv4 } from "uuid";

export const createSession = async (req: Request, res: Response) => {
  const sessionId = uuidv4(),
    obj = { sessionId, users: [] },
    session = await Session.create(obj);

  res.json(session);
};

export const joinSession = async (req: Request, res: Response) => {
  const { sessionId, user } = req.body,
    session = await Session.findOne({ sessionId });

  if (!session) return res.status(404).json({ message: "Session not found" });
  session.users.push({ ...user, online: true });
  await session.save();

  res.json(session);
};

export const getSession = async (req: Request, res: Response) => {
  const on = { sessionId: req.params.id },
    session = await Session.findOne(on);

  res.json(session);
};