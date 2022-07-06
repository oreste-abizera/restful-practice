// VehicleHistory model using mongoose and swaggiffy with fields are: vehicle, owner, date, price, description
const mongoose = require("mongoose");

const { registerSchema } = require("swaggiffy");

const VehicleHistorySchema = new mongoose.Schema(
  {
    vehicle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle",
      required: [true, "Vehicle is required"],
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Owner",
      required: [true, "Owner is required"],
    },
    date: {
      type: Date,
      required: [true, "Date is required"],
    },
    price: {
      type: String,
      required: [true, "Price is required"],
      minlength: [3, "Price must be at least 3 characters"],
      maxlength: [255, "Price must be less than 255 characters"],
    },
    description: {
      type: String,
      required: false,
      minlength: [3, "Description must be at least 3 characters"],
      maxlength: [255, "Description must be less than 255 characters"],
    },
  },
  { timestamps: true }
);

registerSchema("VehicleHistory", VehicleHistorySchema, { orm: "mongoose" });

module.exports = mongoose.model("VehicleHistory", VehicleHistorySchema);
