// @flow

import mongoose from "mongoose";
import passwordHash from "password-hash";

const Schema = mongoose.Schema;

// Create the user Schema
const UserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    token: [{ type: String }],
    resetToken: [{ type: String }],
    created_at: Date,
    updated_at: Date
  },
  { timestamps: true }
);

UserSchema.methods.hashPassword = function() {
  this.password = passwordHash.generate(this.password);
};

// create the model to export
const User = mongoose.model("User", UserSchema);

export default User;
