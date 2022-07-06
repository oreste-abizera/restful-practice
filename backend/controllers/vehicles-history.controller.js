const asyncHandler = require("../middleware/async");
const VehicleHistory = require("../models/VehicleHistory");

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
