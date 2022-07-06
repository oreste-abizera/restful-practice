const asyncHandler = require("../middleware/async");
const Owner = require("../models/Owner");
const User = require("../models/User");
const Vehicle = require("../models/Vehicle");
const ErrorResponse = require("../utils/errorResponse");

module.exports.registerVehicleOwner = asyncHandler(async (req, res, next) => {
  const { names, email, phone, nationalId, address } = req.body;
  const userWithEmail =
    (await User.findOne({ email })) || (await Owner.findOne({ email }));
  if (userWithEmail) {
    return next(new ErrorResponse("User with same email already exists", 400));
  }
  const userWithPhone =
    (await User.findOne({ phone })) || (await Owner.findOne({ phone }));
  if (userWithPhone) {
    return next(
      new ErrorResponse("User with same phone number already exists", 400)
    );
  }
  const userWithNationalId =
    (await User.findOne({ nationalId })) ||
    (await Owner.findOne({ nationalId }));
  if (userWithNationalId) {
    return next(
      new ErrorResponse("User with same national id already exists", 400)
    );
  }
  let user = await Owner.create({
    names,
    email,
    phone,
    nationalId,
    address,
  });
  if (user) {
    return res.status(201).json({
      success: true,
      data: user,
    });
  } else {
    return next(new ErrorResponse("Something went wrong", 500));
  }
});

module.exports.getVehicleOwners = asyncHandler(async (req, res, next) => {
  const owners = await Owner.find();
  if (owners) {
    return res.status(200).json({
      success: true,
      data: owners,
    });
  } else {
    return next(new ErrorResponse("Something went wrong", 500));
  }
});

module.exports.getVehicleOwner = asyncHandler(async (req, res, next) => {
  const owner = await Owner.findById(req.params.id);
  if (owner) {
    return res.status(200).json({
      success: true,
      data: owner,
    });
  } else {
    return next(new ErrorResponse("Something went wrong", 500));
  }
});

module.exports.updateVehicleOwner = asyncHandler(async (req, res, next) => {
  const owner = await Owner.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (owner) {
    return res.status(200).json({
      success: true,
      data: owner,
    });
  } else {
    return next(new ErrorResponse("Something went wrong", 500));
  }
});

module.exports.deleteVehicleOwner = asyncHandler(async (req, res, next) => {
  const owner = await Owner.findByIdAndDelete(req.params.id);
  if (owner) {
    return res.status(200).json({
      success: true,
      data: owner,
    });
  } else {
    return next(new ErrorResponse("Something went wrong", 500));
  }
});

// get vehicles by owner
module.exports.getVehicleByOwner = asyncHandler(async (req, res, next) => {
  const vehicles = await Vehicle.find({ owner: req.params.id });
  if (vehicles) {
    return res.status(200).json({
      success: true,
      data: vehicles,
    });
  } else {
    return next(new ErrorResponse("Something went wrong", 500));
  }
});
