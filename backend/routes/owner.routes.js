const express = require("express");
const {
  registerVehicleOwner,
  getVehicleOwners,
  getVehicleOwner,
  updateVehicleOwner,
  deleteVehicleOwner,
  getVehicleByOwner,
} = require("../controllers/owner.controller");
const { registerDefinition } = require("swaggiffy");

const router = express.Router();

router.post("/register", registerVehicleOwner);
router.get("/", getVehicleOwners);
router.get("/:id", getVehicleOwner);
router.put("/:id", updateVehicleOwner);
router.delete("/:id", deleteVehicleOwner);
router.get("/:id/vehicles", getVehicleByOwner);

registerDefinition(router, {
  tags: "VehicleOwner",
  mappedSchema: "Owner",
  basePath: "/api/v1/vehicle-owners",
});

module.exports = router;
