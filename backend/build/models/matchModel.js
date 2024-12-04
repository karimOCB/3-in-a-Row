"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const matchSchema = new mongoose_1.Schema({
    username1: { type: String, required: [true, "username 1 is required"] },
    email1: { type: String, lowercase: true, required: [true, "email 1 is required"] },
    username2: { type: String, required: [true, "username 2 is required"] },
    email2: { type: String, lowercase: true, required: [true, "email 2 is required"] },
    password: { type: String, required: [true, "password is required"] },
    played: { type: Number },
    won1: { type: Number },
    won2: { type: Number },
});
exports.default = (0, mongoose_1.model)("Match", matchSchema);
