import mongoose from "mongoose";

const { Schema } = mongoose;

const UserSchema = new Schema({});

export default mongoose.model("Hotel", UserSchema);
