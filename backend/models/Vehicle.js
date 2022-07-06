// vehicle schema for mongoose with swaggiffy and fields are: chasisNumber, manufacturer, year, price, plateNumber, model, owner
const mongoose = require("mongoose");
const { registerSchema } = require("swaggiffy");

const VehicleSchema = new mongoose.Schema(
  {
    chasisNumber: {
      type: String,
      required: [true, "Chasis number is required"],
      minlength: [3, "Chasis number must be at least 3 characters"],
      maxlength: [255, "Chasis number must be less than 255 characters"],
    },
    manufacturer: {
      type: String,
      required: [true, "Manufacture Company is required"],
      minlength: [3, "Manufacture Company must be at least 3 characters"],
      maxlength: [255, "Manufacture Company must be less than 255 characters"],
    },
    year: {
      type: String,
      required: [true, "Manufacture Year is required"],
      minlength: [4, "Manufacture Year must be at least 4 characters"],
      maxlength: [4, "Manufacture Year must be less than 4 characters"],
    },
    price: {
      type: String,
      required: [true, "Price is required"],
      minlength: [3, "Price must be at least 3 characters"],
      maxlength: [255, "Price must be less than 255 characters"],
    },
    plateNumber: {
      type: String,
      required: [true, "Plate number is required"],
      minlength: [3, "Plate number must be at least 3 characters"],
      maxlength: [255, "Plate number must be less than 255 characters"],
      unique: [true, "Plate number must be unique"],
    },
    model: {
      type: String,
      required: [true, "Model is required"],
      minlength: [3, "Model must be at least 3 characters"],
      maxlength: [255, "Model must be less than 255 characters"],
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Owner",
    },
  },
  { timestamps: true }
);

registerSchema("Vehicle", VehicleSchema, { orm: "mongoose" });

module.exports = mongoose.model("Vehicle", VehicleSchema);
