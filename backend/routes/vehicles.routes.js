// vehicles router:
const express = require("express");
const { registerDefinition } = require("swaggiffy");
const {
  registerVehicle,
  getVehicles,
  getVehicle,
  updateVehicle,
  deleteVehicle,
  linkVehicleToOwner,
} = require("../controllers/vehicle.controller");

const router = express.Router();

router.post("/register", registerVehicle);
router.get("/", getVehicles);
router.get("/:id", getVehicle);
router.put("/link", linkVehicleToOwner);
router.put("/:id", updateVehicle);
router.delete("/:id", deleteVehicle);

registerDefinition(router, {
  tags: "Vehicle",
  mappedSchema: "Vehicle",
  basePath: "/api/v1/vehicles",
});

module.exports = router;
