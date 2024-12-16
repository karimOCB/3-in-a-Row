import express from "express";
import * as AppController from "../controllers/matches"
import { protectRoute } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/login",  AppController.login);
router.post("/signup", AppController.signup)
router.get("/matches", protectRoute, AppController.getAllMatches)
router.get("/pairMatches/:matchId", protectRoute, AppController.getPairMatches)
router.patch("/gameStats/:matchId", protectRoute, AppController.updateGameStats)

export default router;