import { Route, Routes } from "react-router-dom";
import DashboardPage from "./pages/dashboard";
import HistoryPage from "./pages/HistoryPage";
import LoginPage from "./pages/LoginPage";
import RegisterOwnerPage from "./pages/RegisterOwnerPage";
import RegisterPage from "./pages/RegisterPage";
import VehicleRegistrationPage from "./pages/VehicleRegistrationPage";
import VehiclesPage from "./pages/Vehicles";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/register-owner" element={<RegisterOwnerPage />} />
      <Route path="/register-vehicle" element={<VehicleRegistrationPage />} />
      <Route path="/history" element={<HistoryPage />} />
      <Route path="/vehicles" element={<VehiclesPage />} />
    </Routes>
  );
}

export default App;
