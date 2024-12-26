import createHttpError from "http-errors"
import jwt from "jsonwebtoken"
import matchModel from "../models/matchModel"
import { RequestHandler } from "express"
import { updateGameStatsParams } from "../../types"

export const protectRoute: RequestHandler<updateGameStatsParams | unknown> = async (req, _res, next) => {
    console.log("ProtectRoute - Cookies:", req.cookies)
    const accessToken = req.cookies.accessToken
    console.log("ProtectRoute", accessToken)
    console.log("ProtectRoute - ACCESS_TOKEN_SECRET:", process.env.ACCESS_TOKEN_SECRET);

    try {
        if(!accessToken) {
            console.log("ProtectRoute - No access token found")
            throw createHttpError(401, "Unauthorized - No access token")
        }

        try {
            const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET as string) as { matchId: string }
            console.log("ProtectRoute - Decoded Token:", decoded)
            const match = await matchModel.findById(decoded.matchId).select("-password")
            console.log("ProtectRoute - Match Found:", match)

            if (!match) {
                console.log("ProtectRoute - Match not found")
                throw createHttpError(401, "Match not found")
            }
            
            req.match = match
            next()
        } catch (error) {
            if(error instanceof Error && error.name === "TokenExpiredError") {
                console.log("ProtectRoute - Token expired")
                throw createHttpError(401, "Unauthorized - Access token expired")
            }
            console.log("ProtectRoute - Token verification error:", error)
            throw error
        }

    } catch (error) {
        console.log("ProtectRoute - Invalid access token error:", error)
        throw createHttpError(401, "Unauthorized - Invalid access token")  
    }
}