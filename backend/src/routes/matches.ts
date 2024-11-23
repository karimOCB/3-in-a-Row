import express from "express";
import * as AppController from "../controllers/matches"

const router = express.Router();

router.post("/login",  AppController.login);
router.get("/matches", AppController.getAllMatches)

export default router;