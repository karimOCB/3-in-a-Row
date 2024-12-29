import { Types } from "mongoose"
import matchModel from "./models/matchModel";

export interface IMatch {
  username1: string;
  email1: string;
  username2: string;
  email2: string;
  password?: string;
  played?: number;
  won1?: number;
  won2?: number;
  draws?: number;
  _id: Types.ObjectId;
}


export interface GameStats {
  played: number,
  won1: number,
  won2: number,
  draws: number,
}

declare global {
  namespace Express {
    interface Request {
      match?: IMatch;
    }
  }
}

interface updateGameStatsParams {
  matchId: string
}