"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const matchSchema = new mongoose_1.Schema({
    username1: { type: String, required: [true, "username 1 is required"] },
    email1: { type: String, lowercase: true, required: [true, "email 1 is required"] },
    username2: { type: String, required: [true, "username 2 is required"] },
    email2: { type: String, lowercase: true, required: [true, "email 2 is required"] },
    password: { type: String, required: [true, "password is required"], minlength: [4, "More than 3 characters"] },
    played: { type: Number, default: 0 },
    won1: { type: Number, default: 0 },
    won2: { type: Number, default: 0 },
    draws: { type: Number, default: 0 },
});
exports.default = (0, mongoose_1.model)("Match", matchSchema);
