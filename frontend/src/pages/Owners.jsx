import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import url from "../helpers/url";
import DashboardLayout from "../layouts/DashboardLayout";

const OwnersPage = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AppContext);
  const [owners, setowners] = useState([]);
  useEffect(() => {
    axios.get(url + "/vehicle-owners").then((response) => {
      setowners(response.data.data);
    });
  }, []);

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
        List of Owners
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
              Names
            </h1>
            <h1 className="header__text" style={{ width: "200px" }}>
              National ID
            </h1>
            <h1 className="header__text" style={{ width: "200px" }}>
              Phone Number
            </h1>
            <h1 className="header__text" style={{ width: "200px" }}>
              Address
            </h1>
          </div>
          {owners.map((owner, index) => (
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
                {owner.names}
              </div>
              <div
                style={{
                  width: "200px",
                  color: "#C2C8CF",
                  fontSize: "14px",
                  paddingLeft: "4px",
                }}
              >
                {owner.nationalId}
              </div>
              <div
                style={{
                  width: "200px",
                  color: "#C2C8CF",
                  fontSize: "14px",
                  paddingLeft: "4px",
                }}
              >
                {owner.phone}
              </div>
              <div
                style={{
                  width: "200px",
                  color: "#C2C8CF",
                  fontSize: "14px",
                  paddingLeft: "4px",
                }}
              >
                {owner?.address}
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};
export default OwnersPage;
