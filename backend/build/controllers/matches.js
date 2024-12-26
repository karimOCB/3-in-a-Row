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
exports.refreshToken = exports.getAllMatches = exports.updateGameStats = exports.getPairMatches = exports.login = exports.signup = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const matchModel_1 = __importDefault(require("../models/matchModel"));
const http_errors_1 = __importDefault(require("http-errors"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateTokens = (matchId) => {
    const accessToken = jsonwebtoken_1.default.sign({ matchId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
    const refreshToken = jsonwebtoken_1.default.sign({ matchId }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
    return { accessToken, refreshToken };
};
const setCookies = (res, accessToken, refreshToken) => {
    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: 'strict',
        maxAge: 15 * 60 * 1000
    });
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000
    });
};
const signup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username1, username2, email1, email2, password } = req.body;
    try {
        if (!password || password.length < 5) {
            throw (0, http_errors_1.default)(400, "Password must be at least 5 characters long");
        }
        const passwordHashed = yield bcrypt_1.default.hash(password, 10);
        let match = yield matchModel_1.default.findOne({
            $or: [
                { username1, username2, email1, email2 },
                { username1: username2, username2: username1, email1: email2, email2: email1 }
            ]
        });
        if (match) {
            throw (0, http_errors_1.default)("400", "Match already exist. Login or Create another Match");
        }
        match = yield matchModel_1.default.create({ username1, username2, email1, email2, password: passwordHashed });
        const { accessToken, refreshToken } = generateTokens(match._id);
        setCookies(res, accessToken, refreshToken);
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
        });
    }
    catch (error) {
        next(error);
    }
});
exports.signup = signup;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username1, username2, email1, email2, password } = req.body;
    try {
        if (!password) {
            throw (0, http_errors_1.default)(400, "All fields are required");
        }
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
        const { accessToken, refreshToken } = generateTokens(matchExist._id);
        setCookies(res, accessToken, refreshToken);
        console.log(accessToken, refreshToken);
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
        if (!matches) {
            throw (0, http_errors_1.default)(400, "No match found");
        }
        res.status(200).json({
            played: matches.played,
            won1: matches.won1,
            won2: matches.won2,
            draws: matches.draws
        });
    }
    catch (error) {
        console.error(error);
    }
});
exports.getPairMatches = getPairMatches;
const updateGameStats = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const matchId = req.params.matchId;
    const { played: newPlayed, won1: newWon1, won2: newWon2, draws: newDraws } = req.body;
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
        match.draws = newDraws;
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
const refreshToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const refreshToken = req.
        ;
    }
    catch (error) {
    }
});
exports.refreshToken = refreshToken;
