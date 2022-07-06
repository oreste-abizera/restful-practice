const express = require("express");
const router = express.Router();
const { registerDefinition } = require("swaggiffy");
const {
  getVehiclesOwnershipHistory,
} = require("../controllers/vehicles-history.controller");

router.get("/", getVehiclesOwnershipHistory);

registerDefinition(router, {
  tags: "VehicleHistory",
  mappedSchema: "VehicleHistory",
  basePath: "/api/v1/vehicles-history",
});

module.exports = router;
