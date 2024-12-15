import { RequestHandler, Response } from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt"
import { GameStats, IMatch } from '../../types';
import MatchModel from "../models/matchModel";
import createHttpError from "http-errors";
import jwt from "jsonwebtoken"

const generateTokens = (matchId: mongoose.Types.ObjectId) => {
  const accessToken = jwt.sign({ matchId }, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: "15m" })
  const refreshToken = jwt.sign({ matchId }, process.env.REFRESH_TOKEN_SECRET as string, { expiresIn: "7d"})
  return { accessToken, refreshToken}
}

const setCookies = (res: Response, accessToken: string, refreshToken: string) => {
  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: 'strict', 
    maxAge: 15 * 60 * 1000
  })
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000 
  })
}

export const signup: RequestHandler<unknown, unknown, IMatch, unknown> = async (req, res, next): Promise<any> => {
  const { username1, username2, email1, email2, password } = req.body;

  try {
    if (!password || password.length < 5) {
      throw createHttpError(400, "Password must be at least 5 characters long")
    }

    const passwordHashed = await bcrypt.hash(password, 10)

    let match = await MatchModel.findOne({
      $or: [
        { username1, username2, email1, email2 },
        { username1: username2, username2: username1, email1: email2, email2: email1 }
      ]
    });
    if (match) {
      throw createHttpError("400", "Match already exist. Login or Create another Match")
    }

    match = await MatchModel.create({ username1, username2, email1, email2, password: passwordHashed });
  
    const { accessToken, refreshToken } = generateTokens(match._id)
    
    setCookies(res, accessToken, refreshToken)

    res.status(200).json({
      data: {
        username1: match.username1,
        username2: match.username2,
        email1: match.email1,
        email2: match.email2,
        won1: match.won1,
        won2: match.won2,
        played: match.played,
        draws: match.draws,
        _id: match._id
      }
    })
  } catch (error) {
    if (error instanceof Error)
      console.error(error.message);

    next(error)
  }

}

export const login: RequestHandler<unknown, IMatch | {}, IMatch, unknown> = async (req, res, next): Promise<any> => {
  const { username1, username2, email1, email2, password } = req.body;

  if (!password) {
    throw createHttpError(400, "All fields are required")
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
      throw createHttpError(400, "No Match exist. Create a Match")
    }

    const passwordMatch: boolean = await bcrypt.compare(password, matchExist.password as string)

    if (!passwordMatch) {
      throw createHttpError(401, "Invalid password")
    }

    res.status(200).json({
      data: {
        username1: matchExist.username1,
        username2: matchExist.username2,
        email1: matchExist.email1,
        email2: matchExist.email2,
        won1: matchExist.won1,
        won2: matchExist.won2,
        played: matchExist.played,
        draws: matchExist.draws,
        _id: matchExist._id
      }
    })

  } catch (error) {
    next(error)
  }
};

export const getPairMatches: RequestHandler = async (req, res) => {
  const matchId = req.params.matchId

  try {
    const matches = await MatchModel.findById(matchId).exec();
    if (!matches) {
      throw createHttpError(400, "No match found")
    }

    res.status(200).json({
      played: matches.played,
      won1: matches.won1,
      won2: matches.won2,
      draws: matches.draws
    });
  } catch (error) {
    console.error(error)
  }
}


interface updateGameStatsParams {
  matchId: string
}

export const updateGameStats: RequestHandler<updateGameStatsParams, unknown, GameStats, unknown> = async (req, res, next) => {
  const matchId = req.params.matchId;
  const { played: newPlayed, won1: newWon1, won2: newWon2, draws: newDraws } = req.body;
  console.log(newPlayed, newWon1, newWon2, newDraws, matchId, typeof matchId, mongoose.isValidObjectId(matchId))

  try {
    if (!mongoose.isValidObjectId(matchId)) {
      throw createHttpError(404, "Invalid Match id");
    }

    const match = await MatchModel.findById(matchId).exec();
    if (!match) throw createHttpError(403, "Match not found");

    match.played = newPlayed;
    match.won1 = newWon1;
    match.won2 = newWon2;
    match.draws = newDraws;

    const updatedMatch = await match.save()
    res.status(200).json(updatedMatch);
  } catch (error) {
    next(error)
  }
}

export const getAllMatches: RequestHandler = async (_req, res, next) => {
  try {
    const matches = await MatchModel.find().exec();
    res.status(200).json(matches);
  } catch (error) {
    next(error)
  }
}