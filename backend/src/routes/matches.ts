import express from "express";
import * as AppController from "../controllers/matches"

const router = express.Router();

router.post("/login",  AppController.login);
router.get("/matches", AppController.getAllMatches)
router.get("/pairMatches/:matchId", AppController.getPairMatches)
router.patch("/gameStats/:matchId", AppController.updateGameStats)

export default router;