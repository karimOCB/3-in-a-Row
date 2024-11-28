import { RequestHandler } from "express";
import MatchModel from "../models/matchModel";
import { IMatch } from '../../types';

export const login: RequestHandler<unknown, unknown, IMatch, unknown> = async (req, res) => {
  const { username1, username2, email1, email2 } = req.body;
  try {
    let matchExist = await MatchModel.findOne({
      $or: [
        { username1, username2, email1, email2 },
        { username: username2, username2: username1, email1: email2, email2: email1 }
      ]
    });
    // handle error better, for example message when the email or username exist but don't coincide

    if (!matchExist) {
      const won1 = 0;
      const won2 = 0;
      const played = 0;
      matchExist = await MatchModel.create({ username1, username2, email1, email2, played, won1, won2 });
    }

    res.json({
      username1: matchExist.username1,
      username2: matchExist.username2,
      email1: matchExist.email1,
      email2: matchExist.email2,
      won1: matchExist.won1,
      won2: matchExist.won2,
      played: matchExist.played
    })

  } catch (error) {
    res.status(500).json({ message: error })
  }
};

export const getAllMatches: RequestHandler = async (_req, res) => {
  try {
    const matches = await MatchModel.find().exec();
    res.status(200).json(matches);
  } catch (error) {
    console.error(error)
  }
}