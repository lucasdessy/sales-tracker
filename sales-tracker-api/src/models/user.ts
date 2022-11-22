import mongoose from "mongoose";
interface IUser extends mongoose.Document {
  email: string;
  nome: string;
  permission: string;
  // password stored as a hash
  password: string;
  // salt used to hash the password
  salt: string;
}

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  nome: { type: String, required: true },
  permission: { type: String, required: true },
  password: { type: String, required: true },
  salt: { type: String, required: true },
});

export const User = mongoose.model<IUser>("User", UserSchema, "users");
