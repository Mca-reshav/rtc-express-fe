import { Request, Response } from "express";
import { Session } from "../models/session.model";
import { v4 as uuidv4 } from "uuid";

export const createSession = async (req: Request, res: Response) => {
  const { user } = req.body;
  if (!user || !user.name)
    return res.status(400).json({ message: "User required" });

  const sessionId = uuidv4();
  const session = await Session.create({
    sessionId,
    users: [{ ...user, online: true }],
  });

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