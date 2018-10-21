// @flow

import mongoose from 'mongoose';
import passwordHash from 'password-hash';

const Schema = mongoose.Schema;

// Create the user Schema
const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  token: [ { type: String } ],
  resetToken: [ { type: String } ],
  created_at: Date,
  updated_at: Date
});

// Todo
// Make a utility that adds created_at and update_at time and employ that to every schema

// Add created_at and updated_at before save operation
UserSchema.pre('save', function(next){
  const currentTime 	= new Date();

  this.updated_at 	= currentTime;

  if (!this.created_at) { this.created_at = currentTime }

  next();
});

UserSchema.methods.hashPassword = function() {
  this.password = passwordHash.generate(this.password)
};

// create the model to export
const userModel = mongoose.model('User', UserSchema);

export default userModel;
