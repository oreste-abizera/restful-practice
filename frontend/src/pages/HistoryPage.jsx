import axios from "axios";
import React, { useEffect, useState } from "react";
import url from "../helpers/url";
import DashboardLayout from "../layouts/DashboardLayout";

const HistoryPage = () => {
  const [history, setHistory] = useState([]);
  useEffect(() => {
    axios.get(url + "/vehicles-history").then((response) => {
      setHistory(response.data.data);
    });
  }, []);
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
        History
      </h1>
      <div style={{ display: "flex", marginLeft: "59px" }}>
        <div
          style={{
            backgroundColor: "white",
            padding: "20px",
            minWidth: "800px",
          }}
        >
          <div style={{ display: "flex", gap: "76px" }}>
            <h1 className="header__text" style={{ width: "200px" }}>
              Vehicle Chasis Number
            </h1>
            <h1 className="header__text" style={{ width: "200px" }}>
              Owner
            </h1>
            <h1 className="header__text" style={{ width: "200px" }}>
              Date
            </h1>
            <h1 className="header__text" style={{ width: "200px" }}>
              Price
            </h1>
          </div>

          {history.map((history, index) => (
            <div style={{ display: "flex", gap: "76px", marginTop: "20px" }}>
              <div
                style={{
                  width: "200px",
                  color: "#C2C8CF",
                  fontSize: "14px",
                  paddingLeft: "4px",
                }}
              >
                {history.vehicle.chasisNumber}
              </div>
              <div
                style={{
                  width: "200px",
                  color: "#C2C8CF",
                  fontSize: "14px",
                  paddingLeft: "4px",
                }}
              >
                {history.owner?.names}
              </div>
              <div
                style={{
                  width: "200px",
                  color: "#C2C8CF",
                  fontSize: "14px",
                  paddingLeft: "4px",
                }}
              >
                {history.date?.split("T")[0]}
              </div>
              <div
                style={{
                  width: "200px",
                  color: "#C2C8CF",
                  fontSize: "14px",
                  paddingLeft: "4px",
                }}
              >
                {parseFloat(history.price).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default HistoryPage;
