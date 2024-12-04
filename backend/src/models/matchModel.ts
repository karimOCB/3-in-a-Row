import { Schema, model } from "mongoose"
import { IMatch } from '../../types';

const matchSchema = new Schema<IMatch>({
  username1: { type: String, required: [ true, "username 1 is required" ] },
  email1: { type: String, lowercase: true, required: [true, "email 1 is required"] },
  username2: { type: String, required: [true, "username 2 is required"] },
  email2: { type: String, lowercase: true, required: [true, "email 2 is required"] },
  password: { type: String, required: [true, "password is required"] },
  played: { type: Number },
  won1: { type: Number },
  won2: { type: Number },
});

export default model<IMatch>("Match", matchSchema);