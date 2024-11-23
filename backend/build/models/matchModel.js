"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const matchSchema = new mongoose_1.Schema({
    username1: { type: String, required: true },
    email1: { type: String, required: true },
    username2: { type: String, required: true },
    email2: { type: String, required: true },
    played: { type: Number },
    won1: { type: Number },
    won2: { type: Number },
});
exports.default = (0, mongoose_1.model)("Match", matchSchema);
