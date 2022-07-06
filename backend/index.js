const { Swaggiffy } = require("swaggiffy");
const dotenv = require("dotenv");
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const errorHandler = require("./middleware/error");

// import routes
const authRoutes = require("./routes/auth.routes");
const vehiclesRoutes = require("./routes/vehicles.routes");
const ownerRoutes = require("./routes/owner.routes");
const vehicleHistoryRoutes = require("./routes/vehicles-history.routes");

dotenv.config({ path: "./config/config.env" });
connectDB();

const app = express();

app.use(express.json());
app.use(cors());

// routes
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/vehicles", vehiclesRoutes);
app.use("/api/v1/vehicle-owners", ownerRoutes);
app.use("/api/v1/vehicles-history", vehicleHistoryRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

new Swaggiffy().setupExpress(app).swaggiffy();
