const User = require("../models/User");
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");
const Owner = require("../models/Owner");

module.exports.register = asyncHandler(async (req, res, next) => {
  const { names, email, phone, password, nationalId } = req.body;

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

  let user = await User.create({
    names,
    email,
    phone,
    password,
    nationalId,
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

module.exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return next(new ErrorResponse("Invalid Credentials", 400));
  }

  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    return next(new ErrorResponse("Invalid Credentials", 400));
  }

  const token = user.getSignedJwtToken();
  return res.status(200).json({
    success: true,
    token,
    data: user,
  });
});
