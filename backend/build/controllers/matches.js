"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllMatches = exports.updateGameStats = exports.getPairMatches = exports.login = exports.signup = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const matchModel_1 = __importDefault(require("../models/matchModel"));
const http_errors_1 = __importDefault(require("http-errors"));
const signup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username1, username2, email1, email2, password } = req.body;
    try {
        if (!password || password.length < 5) {
            throw (0, http_errors_1.default)(400, "Password must be at least 5 characters long");
        }
        const passwordHashed = yield bcrypt_1.default.hash(password, 10);
        const match = yield matchModel_1.default.create({ username1, username2, email1, email2, password: passwordHashed });
        res.status(200).json({ data: {
                username1: match.username1,
                username2: match.username2,
                email1: match.email1,
                email2: match.email2,
                won1: match.won1,
                won2: match.won2,
                played: match.played,
                _id: match._id
            }
        });
    }
    catch (error) {
        if (error instanceof Error)
            console.error(error.message);
        next(error);
    }
});
exports.signup = signup;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username1, username2, email1, email2, password } = req.body;
    if (!password) {
        throw (0, http_errors_1.default)(400, "All fields are required");
    }
    try {
        let matchExist = yield matchModel_1.default.findOne({
            $or: [
                { username1, username2, email1, email2 },
                { username1: username2, username2: username1, email1: email2, email2: email1 }
            ]
        });
        // handle error better, for example message when the email or username exist but don't coincide
        if (!matchExist) {
            throw (0, http_errors_1.default)(400, "No Match exist. Create a Match");
        }
        const passwordMatch = yield bcrypt_1.default.compare(password, matchExist.password);
        if (!passwordMatch) {
            throw (0, http_errors_1.default)(401, "Invalid password");
        }
        res.status(200).json({ data: {
                username1: matchExist.username1,
                username2: matchExist.username2,
                email1: matchExist.email1,
                email2: matchExist.email2,
                won1: matchExist.won1,
                won2: matchExist.won2,
                played: matchExist.played,
                _id: matchExist._id
            }
        });
    }
    catch (error) {
        next(error);
    }
});
exports.login = login;
const getPairMatches = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const matchId = req.params.matchId;
    try {
        const matches = yield matchModel_1.default.findById(matchId).exec();
        res.status(200).json({
            played: matches === null || matches === void 0 ? void 0 : matches.played,
            won1: matches === null || matches === void 0 ? void 0 : matches.won1,
            won2: matches === null || matches === void 0 ? void 0 : matches.won2,
        });
    }
    catch (error) {
        console.error(error);
    }
});
exports.getPairMatches = getPairMatches;
const updateGameStats = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const matchId = req.params.matchId;
    const { played: newPlayed, won1: newWon1, won2: newWon2 } = req.body;
    console.log(newPlayed, newWon1, newWon2, matchId, typeof matchId, mongoose_1.default.isValidObjectId(matchId));
    try {
        if (!mongoose_1.default.isValidObjectId(matchId)) {
            throw (0, http_errors_1.default)(404, "Invalid Match id");
        }
        const match = yield matchModel_1.default.findById(matchId).exec();
        if (!match)
            throw (0, http_errors_1.default)(403, "Match not found");
        match.played = newPlayed;
        match.won1 = newWon1;
        match.won2 = newWon2;
        const updatedMatch = yield match.save();
        res.status(200).json(updatedMatch);
    }
    catch (error) {
        next(error);
    }
});
exports.updateGameStats = updateGameStats;
const getAllMatches = (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const matches = yield matchModel_1.default.find().exec();
        res.status(200).json(matches);
    }
    catch (error) {
        next(error);
    }
});
exports.getAllMatches = getAllMatches;
