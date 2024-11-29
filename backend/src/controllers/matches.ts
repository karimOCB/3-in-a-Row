import { RequestHandler } from "express";
import MatchModel from "../models/matchModel";
import { GameStats, IMatch } from '../../types';

export const login: RequestHandler<unknown, IMatch | unknown, IMatch, unknown> = async (req, res) => {
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
      played: matchExist.played,
      _id: matchExist._id
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

interface updateGameStatsParams {
  matchId: string
}

export const updateGameStats: RequestHandler<updateGameStatsParams, unknown, GameStats, unknown> = async  (req, res) => {
  const matchId = req.params.matchId;
  const { played: newPlayed, won1: newWon1, won2: newWon2 } = req.body;

  try {
    const match = await MatchModel.findById(matchId).exec();
    if(!match) throw new Error ("Match not found");
    match.played = newPlayed;
    match.won1 = newWon1;
    match.won2 = newWon2;
    
    const updatedMatch = await match.save()
    res.status(200).json(updatedMatch);
  } catch (error) {
    console.log(error)
  }
}