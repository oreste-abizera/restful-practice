import axios from "axios";
import React, { useEffect, useState } from "react";
import url from "../helpers/url";
import DashboardLayout from "../layouts/DashboardLayout";
import Modal from "react-modal";
import Select from "react-select";
import toast from "react-hot-toast";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const VehiclesPage = () => {
  const [reload, setReload] = useState(false);
  const [selectedOwner, setSelectedOwner] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [vehicles, setVehicles] = useState([]);
  const [owners, setowners] = useState([]);
  useEffect(() => {
    axios.get(url + "/vehicles").then((response) => {
      setVehicles(response.data.data);
    });
    axios.get(url + "/vehicle-owners").then((response) => {
      setowners(response.data.data);
    });
  }, [reload]);
  const [modalIsOpen, setIsOpen] = React.useState(null);

  function openModal(value) {
    setIsOpen(value);
    setSelectedVehicle(value);
  }

  function closeModal() {
    setIsOpen(null);
  }

  const handleChange = (selectedOption) => {
    setSelectedOwner(selectedOption);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let response = await axios.put(url + "/vehicles/link", {
        vehicleId: selectedVehicle,
        ownerId: selectedOwner.value,
        date: new Date(),
      });
      if (response.data.success) {
        toast.success("Vehicle registration successful");
        setReload(!reload);
        closeModal();
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.error ||
          error.response?.data?.message ||
          "Something went wrong"
      );
    }
  };

  const options = owners.map((owner) => {
    return {
      value: owner._id,
      label: owner.names,
    };
  });

  return (
    <DashboardLayout>
      <h1
        style={{
          color: "#6484AA",
          fontSize: "28px",
          fontWeight: "bold",
          margin: "64px 0 48px 59px",
        }}
      >
        Vehicles
      </h1>
      <div style={{ display: "flex", marginLeft: "59px" }}>
        <div
          style={{
            backgroundColor: "white",
            padding: "20px",
            minWidth: "900px",
          }}
        >
          <div style={{ display: "flex", gap: "76px" }}>
            <h1 className="header__text" style={{ width: "200px" }}>
              Chasis Number
            </h1>
            <h1 className="header__text" style={{ width: "200px" }}>
              Manufacturer
            </h1>
            <h1 className="header__text" style={{ width: "200px" }}>
              Plate Number
            </h1>
            <h1 className="header__text" style={{ width: "200px" }}>
              Owner
            </h1>
            <h1
              className="header__text"
              style={{ width: "100px", textAlign: "center" }}
            >
              Action
            </h1>
          </div>
          {vehicles.map((vehicle, index) => (
            <div
              style={{ display: "flex", gap: "76px", marginTop: "20px" }}
              key={index}
            >
              <div
                style={{
                  width: "200px",
                  color: "#C2C8CF",
                  fontSize: "14px",
                  paddingLeft: "4px",
                }}
              >
                {vehicle.chasisNumber}
              </div>
              <div
                style={{
                  width: "200px",
                  color: "#C2C8CF",
                  fontSize: "14px",
                  paddingLeft: "4px",
                }}
              >
                {vehicle.manufacturer}
              </div>
              <div
                style={{
                  width: "200px",
                  color: "#C2C8CF",
                  fontSize: "14px",
                  paddingLeft: "4px",
                }}
              >
                {vehicle.plateNumber}
              </div>
              <div
                style={{
                  width: "200px",
                  color: "#C2C8CF",
                  fontSize: "14px",
                  paddingLeft: "4px",
                }}
              >
                {vehicle.owner?.names || "N/A"}
              </div>
              <div
                style={{
                  width: "100px",
                  color: "#C2C8CF",
                  fontSize: "14px",
                  paddingLeft: "4px",
                  textAlign: "center",
                }}
              >
                <button
                  onClick={() => openModal(vehicle._id)}
                  style={{
                    backgroundColor: "#6484AA",
                    border: "none",
                    borderRadius: "4px",
                    color: "white",
                    fontSize: "14px",
                    padding: "8px",
                    textAlign: "center",
                    textDecoration: "none",
                    width: "100px",
                    cursor: "pointer",
                  }}
                >
                  Link
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen !== null}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <form
          style={{ width: "400px", height: "300px" }}
          onSubmit={handleSubmit}
        >
          <Select
            options={options}
            placeholder="Select the owner"
            onChange={handleChange}
          />
          <button
            style={{
              backgroundColor: "#6484AA",
              border: "none",
              borderRadius: "4px",
              color: "white",
              fontSize: "14px",
              padding: "8px",
              textAlign: "center",
              textDecoration: "none",
              width: "100px",
              cursor: "pointer",
              marginTop: "20px",
            }}
          >
            Link
          </button>
          {/* close button */}
          <button
            onClick={closeModal}
            style={{
              backgroundColor: "#6484AA",
              border: "none",
              borderRadius: "4px",
              color: "white",
              fontSize: "14px",
              padding: "8px",
              textAlign: "center",
              textDecoration: "none",
              width: "100px",
              cursor: "pointer",
              marginTop: "20px",
              marginLeft: "20px",
            }}
          >
            Close
          </button>
        </form>
      </Modal>
    </DashboardLayout>
  );
};
export default VehiclesPage;
