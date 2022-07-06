const express = require("express");
const router = express.Router();
const { registerDefinition } = require("swaggiffy");
const {
  getVehiclesOwnershipHistory,
  statistics,
} = require("../controllers/vehicles-history.controller");

router.get("/", getVehiclesOwnershipHistory);
router.get("/statistics", statistics);

registerDefinition(router, {
  tags: "VehicleHistory",
  mappedSchema: "VehicleHistory",
  basePath: "/api/v1/vehicles-history",
});

module.exports = router;
