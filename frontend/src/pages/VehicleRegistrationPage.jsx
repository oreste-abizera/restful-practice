import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import SubmitButton from "../components/SubmitButton";
import { AppContext } from "../context/AppContext";
import url from "../helpers/url";
import DashboardLayout from "../layouts/DashboardLayout";

const VehicleRegistrationPage = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AppContext);
  const [state, setState] = useState({
    plateNumber: "",
    chasisNumber: "",
    manufacturer: "",
    model: "",
    year: "",
    price: "",
  });
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setState({
      ...state,
      [name]: value,
    });
  };
  const handleSubmit = async (event) => {
    console.log(state);
    event.preventDefault();
    try {
      let response = await axios.post(url + "/vehicles/register", state);
      if (response.data.success) {
        toast.success("Vehicle registration successful");
        navigate("/");
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

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn]);
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
        Vehicle Registration
      </h1>
      <form style={{ marginLeft: "59px" }} onSubmit={handleSubmit}>
        <Input
          placeholder={"Chasis Number"}
          name="chasisNumber"
          onChange={handleInputChange}
        />
        <Input
          placeholder={"Manufacture Company"}
          name="manufacturer"
          onChange={handleInputChange}
        />
        <Input
          placeholder={"Manufacture Year"}
          name="year"
          onChange={handleInputChange}
        />
        <Input
          placeholder={"Price"}
          name="price"
          onChange={handleInputChange}
        />
        <Input
          placeholder={"Plate Number"}
          name="plateNumber"
          onChange={handleInputChange}
        />
        <Input
          placeholder={"Model Name"}
          name="model"
          onChange={handleInputChange}
        />
        <SubmitButton value={"Register"} />
      </form>
    </DashboardLayout>
  );
};

export default VehicleRegistrationPage;
