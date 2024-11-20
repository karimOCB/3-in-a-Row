import express from "express";
import * as UserController from "../controllers/matches"

const router = express.Router();

router.post("/login",  UserController.matches);

export default router;