import { RequestHandler } from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt"
import { GameStats, IMatch } from '../../types';
import MatchModel from "../models/matchModel";

export const signup: RequestHandler = async (req, res) => {
  const { username1, username2, email1, email2, password } = req.body;

  try {
    if (!password || password.length < 5) {
      res.status(400).json({ error: "Password must be at least 5 characters long" })
      return;
    }

    const passwordHashed = await bcrypt.hash(password, 10)

    const match = await MatchModel.create({ username1, username2, email1, email2, password: passwordHashed });

    res.status(200).json({
      username1: match.username1,
      username2: match.username2,
      email1: match.email1,
      email2: match.email2,
      won1: match.won1,
      won2: match.won2,
      played: match.played,
      _id: match._id
    })
  } catch (error) {
    
    res.status(500).json({ error: "Internal Server Error" });
  }
  
}

export const login: RequestHandler<unknown, IMatch | {}, IMatch, unknown> = async (req, res): Promise<void> => {
  const { username1, username2, email1, email2, password } = req.body;
  if (!password || !username1 || !username2 || email1 || email2) {
    res.status(400).json({ error: "All fields are required" })
    return;
  }

  try {
    let matchExist = await MatchModel.findOne({
      $or: [
        { username1, username2, email1, email2 },
        { username1: username2, username2: username1, email1: email2, email2: email1 }
      ]
    });
    // handle error better, for example message when the email or username exist but don't coincide
    if (!matchExist) {
      res.status(400).json({ error: "No Match exist. Create a Match." })
      return
    }

    const passwordMatch: boolean = await bcrypt.compare(password, matchExist.password as string)

    if (!passwordMatch) {
      res.status(401).json({ error: "Invalid password" })
    }

    res.status(200).json({
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

export const getPairMatches: RequestHandler = async (req, res) => {
  const matchId = req.params.matchId

  try {
    const matches = await MatchModel.findById(matchId).exec();
    res.status(200).json({
      played: matches?.played,
      won1: matches?.won1,
      won2: matches?.won2,
    });
  } catch (error) {
    console.error(error)
  }
}


interface updateGameStatsParams {
  matchId: string
}

export const updateGameStats: RequestHandler<updateGameStatsParams, unknown, GameStats, unknown> = async (req, res) => {
  const matchId = req.params.matchId;
  const { played: newPlayed, won1: newWon1, won2: newWon2 } = req.body;
  console.log(newPlayed, newWon1, newWon2, matchId, typeof matchId, mongoose.isValidObjectId(matchId))

  try {
    if (!mongoose.isValidObjectId(matchId)) {
      throw new Error('"Invalid Match id"');
    }
    const match = await MatchModel.findById(matchId).exec();
    if (!match) throw new Error("Match not found");
    match.played = newPlayed;
    match.won1 = newWon1;
    match.won2 = newWon2;

    const updatedMatch = await match.save()
    res.status(200).json(updatedMatch);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error });
  }
}

export const getAllMatches: RequestHandler = async (_req, res) => {
  try {
    const matches = await MatchModel.find().exec();
    res.status(200).json(matches);
  } catch (error) {
    console.error(error)
  }
}