import React from "react";

const DashboardCard = ({ icon, text1, text2, text3, text4 }) => {
  return (
    <div
      style={{
        width: "332px",
        height: "205px",
        backgroundColor: "white",
        borderRadius: "8px",
      }}
    >
      <p
        style={{
          color: "#6484AA",
          fontWeight: "500",
          fontSize: "18px",
          margin: "24px 35px",
        }}
      >
        {text1}
      </p>
      <h1
        style={{
          marginRight: "43px",
          color: "#6484AA",
          fontSize: "60px",
          textAlign: "right",
        }}
      >
        {text2}
      </h1>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginRight: "65px",
          marginLeft: "35px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <img
            src={icon}
            alt="icon"
            style={{ width: "14px", height: "14px" }}
          />
          <p style={{ color: "#64C874" }}>{text3}</p>
        </div>
        <p style={{ color: "#D0D2D3" }}>{text4}</p>
      </div>
    </div>
  );
};

export default DashboardCard;
