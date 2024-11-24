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
exports.matches = exports.login = void 0;
const matchModel_1 = __importDefault(require("../models/matchModel"));
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username1, username2, email1, email2 } = req.body;
    try {
        let matchExist = yield matchModel_1.default.findOne({
            $or: [
                { username1, username2, email1, email2 },
                { username: username2, username2: username1, email1: email2, email2: email1 }
            ]
        });
        // handle error better, for example message when the email or username exist but don't coincide
        if (!matchExist) {
            matchExist = yield matchModel_1.default.create({ username1, username2, email1, email2 });
        }
        res.json({
            username1: matchExist.username1,
            username2: matchExist.username2,
            email1: matchExist.email1,
            email2: matchExist.email2,
        });
    }
    catch (error) {
        res.status(500).json({ message: "Invalid email or password" });
    }
});
exports.login = login;
const matches = () => undefined;
exports.matches = matches;