import createHttpError from "http-errors"
import jwt from "jsonwebtoken"
import matchModel from "../models/matchModel"
import { RequestHandler } from "express"
import { updateGameStatsParams } from "../../types"

export const protectRoute: RequestHandler<updateGameStatsParams | unknown> = async (req, _res, next) => {
    const accessToken = req.cookies.accessToken
    console.log("ProtectRoute", accessToken)
    try {
        if(!accessToken) {
            throw createHttpError(401, "Unathorized - No access token")
        }

        try {
            const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET as string) as { matchId: string }
            const match = await matchModel.findById(decoded.matchId).select("-password")

            if (!match) {
                throw createHttpError(401, "Match not found")
            }
            
            req.match = match
            next()
        } catch (error) {
            if(error instanceof Error && error.name === "TokenExpiredError") {
                throw createHttpError(401, "Unauthorized - Access token expired")
            }
            throw error
        }

    } catch (error) {
      throw createHttpError(401, "Unauthorized - Invalid accest token")  
    }
}