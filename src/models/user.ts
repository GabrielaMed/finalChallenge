import { Schema, model, Document } from "mongoose";
import { UserQualified } from "../enums/userQualified";
import bcrypt from "bcrypt";

interface IUser extends Document {
  name: string;
  cpf: string;
  birth: Date;
  email: string;
  password: string;
  cep: string;
  qualified: UserQualified;
  patio: string;
  complement: string;
  neighborhood: string;
  locality: string;
  uf: string;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    cpf: { type: String, required: true, unique: true },
    birth: { type: Date, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, min: 6, selected: false },
    cep: { type: String, required: true },
    qualified: { type: String, required: true, enum: ["yes", "no"] },
    patio: { type: String, required: true, default: "" },
    complement: { type: String, required: true, default: "" },
    neighborhood: { type: String, required: true, default: "" },
    locality: { type: String, required: true, default: "" },
    uf: { type: String, required: true, default: "" },
  },
  { versionKey: false }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

export const UserModel = model<IUser>("User", userSchema);
