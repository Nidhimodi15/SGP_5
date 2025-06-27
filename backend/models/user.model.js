import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    googleID: {
      type: String,
      unique: true,
      required: [true, "Google ID cannot be empty"],
      index: true,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email ID cannot be empty"],
    },
    name: {
      type: String,
      trim: true,
      required: [true, "Name cannot be empty"],
    },
    profileIMG: {
      type: String,
      required: [true, "Image is required"],
    },
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.generateJwtToken = function () {
  const Token = jwt.sign(
    {
      _id: this._id,
      googleID: this.googleID,
      email: this.email,
      name: this.name,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
  return Token;
};

const User = mongoose.model("User", userSchema);
export default User;
