const asyncHandler = require("../middleware/async");
const Owner = require("../models/Owner");
const Vehicle = require("../models/Vehicle");
const VehicleHistory = require("../models/VehicleHistory");
const ErrorResponse = require("../utils/errorResponse");

module.exports.registerVehicle = asyncHandler(async (req, res, next) => {
  const { chasisNumber, manufacturer, year, price, plateNumber, model, owner } =
    req.body;
  const vehicle = await Vehicle.create({
    chasisNumber,
    manufacturer,
    year,
    price,
    plateNumber,
    model,
    owner,
  });
  if (vehicle) {
    return res.status(201).json({
      success: true,
      data: vehicle,
    });
  } else {
    return next(new ErrorResponse("Something went wrong", 500));
  }
});

module.exports.getVehicles = asyncHandler(async (req, res, next) => {
  const vehicles = await Vehicle.find().populate("owner");
  if (vehicles) {
    return res.status(200).json({
      success: true,
      data: vehicles,
    });
  } else {
    return next(new ErrorResponse("Something went wrong", 500));
  }
});

module.exports.getVehicle = asyncHandler(async (req, res, next) => {
  const vehicle = await Vehicle.findById(req.params.id);
  if (vehicle) {
    return res.status(200).json({
      success: true,
      data: vehicle,
    });
  } else {
    return next(new ErrorResponse("Something went wrong", 500));
  }
});

module.exports.updateVehicle = asyncHandler(async (req, res, next) => {
  const vehicle = await Vehicle.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (vehicle) {
    return res.status(200).json({
      success: true,
      data: vehicle,
    });
  } else {
    return next(new ErrorResponse("Something went wrong", 500));
  }
});

module.exports.deleteVehicle = asyncHandler(async (req, res, next) => {
  const vehicle = await Vehicle.findByIdAndDelete(req.params.id);
  if (vehicle) {
    return res.status(200).json({
      success: true,
      data: vehicle,
    });
  } else {
    return next(new ErrorResponse("Something went wrong", 500));
  }
});

module.exports.getVehicleByOwner = asyncHandler(async (req, res, next) => {
  const vehicle = await Vehicle.find({ owner: req.params.id });
  if (vehicle) {
    return res.status(200).json({
      success: true,
      data: vehicle,
    });
  } else {
    return next(new ErrorResponse("Something went wrong", 500));
  }
});

// link vehicle to owner and save to vehicle history providing vehicle id owner id and date
module.exports.linkVehicleToOwner = asyncHandler(async (req, res, next) => {
  const { vehicleId, ownerId, date, description } = req.body;
  const vehicle = await Vehicle.findById(vehicleId);
  const owner = await Owner.findById(ownerId);
  if (vehicle && owner) {
    const vehicleHistory = await VehicleHistory.create({
      vehicle: vehicleId,
      owner: ownerId,
      date,
      description,
      price: vehicle.price,
    });
    await Vehicle.findByIdAndUpdate(vehicleId, { owner: ownerId });
    if (vehicleHistory) {
      return res.status(201).json({
        success: true,
        data: vehicleHistory,
      });
    } else {
      return next(new ErrorResponse("Something went wrong", 500));
    }
  } else {
    return next(new ErrorResponse("Something went wrong 1", 500));
  }
});
