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
exports.protectRoute = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const matchModel_1 = __importDefault(require("../models/matchModel"));
const protectRoute = (req, _res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const accessToken = req.cookies.accessToken;
    try {
        if (!accessToken) {
            throw (0, http_errors_1.default)(401, "Unauthorized - No access token");
        }
        try {
            const decoded = jsonwebtoken_1.default.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
            const match = yield matchModel_1.default.findById(decoded.matchId).select("-password");
            if (!match) {
                throw (0, http_errors_1.default)(401, "Match not found");
            }
            req.match = match;
            next();
        }
        catch (error) {
            if (error instanceof Error && error.name === "TokenExpiredError") {
                throw (0, http_errors_1.default)(401, "Unauthorized - Access token expired");
            }
            throw error;
        }
    }
    catch (error) {
        throw (0, http_errors_1.default)(401, "Unauthorized - Invalid access token");
    }
});
exports.protectRoute = protectRoute;
