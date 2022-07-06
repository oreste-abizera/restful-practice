const mongoose = require("mongoose");
const { registerSchema } = require("swaggiffy");

const OwnerSchema = new mongoose.Schema({
  names: {
    type: String,
    required: [true, "Names are required"],
    minlength: [3, "Names must be at least 3 characters"],
    maxlength: [255, "Names must be less than 255 characters"],
  },
  nationalId: {
    type: String,
    required: [true, "National ID is required"],
    minlength: [16, "National ID must be 16 characters"],
    maxlength: [16, "National ID must be 16 characters"],
    unique: [true, "National ID must be unique"],
  },
  phone: {
    type: String,
    required: [true, "Phone is required"],
    minlength: [10, "Phone must be 10 characters"],
    maxlength: [10, "Phone must be 10 characters"],
    unique: [true, "Phone must be unique"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    minlength: [3, "Email must be at least 3 characters"],
    maxlength: [255, "Email must be less than 255 characters"],
    unique: [true, "Email already exists"],
    match: [
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Invalid email address",
    ],
  },
  address: {
    type: String,
    required: [true, "Address is required"],
    minlength: [3, "Address must be at least 3 characters"],
    maxlength: [255, "Address must be less than 255 characters"],
  },
});

registerSchema("Owner", OwnerSchema, { orm: "mongoose" });

module.exports = mongoose.model("Owner", OwnerSchema);
