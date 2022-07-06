const asyncHandler = require("../middleware/async");
const VehicleHistory = require("../models/VehicleHistory");
const Vehicle = require("../models/Vehicle");
const Owner = require("../models/Owner");

module.exports.getVehiclesOwnershipHistory = asyncHandler(
  async (req, res, next) => {
    const vehicles = await VehicleHistory.find().populate("vehicle owner");
    if (vehicles) {
      return res.status(200).json({
        success: true,
        data: vehicles,
      });
    } else {
      return next(new ErrorResponse("Something went wrong", 500));
    }
  }
);

module.exports.statistics = asyncHandler(async (req, res, next) => {
  const numberOfVehicles = await VehicleHistory.countDocuments();
  const numberOfOwners = await Owner.countDocuments();
  const numberOfHistory = await VehicleHistory.countDocuments();

  return res.status(200).json({
    success: true,
    data: {
      numberOfVehicles,
      numberOfOwners,
      interactions: numberOfHistory,
    },
  });
});
