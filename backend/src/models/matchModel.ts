import { Schema, model } from "mongoose"
import { IMatch } from '../../types';

const matchSchema = new Schema<IMatch>({
  username1: { type: String, required: true },
  email1: { type: String, required: true },
  username2: { type: String, required: true },
  email2: { type: String, required: true },
  played: { type: Number },
  won1: { type: Number },
  won2: { type: Number },
});

export default model<IMatch>("Match", matchSchema);