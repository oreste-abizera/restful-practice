import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import SubmitButton from "../components/SubmitButton";
import url from "../helpers/url";
import DashboardLayout from "../layouts/DashboardLayout";

const RegisterOwnerPage = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    names: "",
    email: "",
    password: "",
    phone: "",
    nationalId: "",
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
      let response = await axios.post(url + "/vehicle-owners/register", state);
      if (response.data.success) {
        toast.success("Vehicle owner registration successful");
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
        Owner Registration
      </h1>
      <form style={{ marginLeft: "59px" }} onSubmit={handleSubmit}>
        <Input
          placeholder={"Names"}
          name="names"
          onChange={handleInputChange}
        />
        <Input
          placeholder={"Email"}
          name="email"
          onChange={handleInputChange}
        />
        <Input
          placeholder={"Phone"}
          name="phone"
          onChange={handleInputChange}
        />
        <Input
          placeholder={"National Id"}
          name="nationalId"
          onChange={handleInputChange}
        />
        <Input
          placeholder={"Address"}
          name="address"
          onChange={handleInputChange}
        />
        <SubmitButton value={"Register"} />
      </form>
    </DashboardLayout>
  );
};

export default RegisterOwnerPage;
