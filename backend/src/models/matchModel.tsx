import { Schema, model } from "mongoose"

interface IMatch {
  username1: string,
  email1: string,
  username2: string,
  email2: string,
  played?: number,
  won1?: number,
  won2?: number,
}

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