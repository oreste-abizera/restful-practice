import React, { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import increaseIcon from "../assets/icons/increase.svg";
import decreaseIcon from "../assets/icons/decrease.svg";
import DashboardCard from "../components/DashboardCard";
import axios from "axios";
import url from "../helpers/url";

const DashboardPage = () => {
  const [statistics, setStatistics] = useState([]);

  useEffect(() => {
    axios.get(url + "/vehicles-history/statistics").then((response) => {
      setStatistics(response.data.data);
    });
  }, []);
  console.log(statistics);
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
        DASHBOARD
      </h1>
      <div style={{ display: "flex", gap: "23px", marginLeft: "59px" }}>
        <DashboardCard
          text1={"Total Owners"}
          text4={"users"}
          icon={increaseIcon}
          text2="1,285"
          text3={"6,3%"}
        />
        <DashboardCard
          text1={"Total Vehicles"}
          text4={"vehicles"}
          icon={increaseIcon}
          text2="136"
          text3={"2,3%"}
        />
        <DashboardCard
          text1={"Total Engagement"}
          text4={"interactions"}
          icon={decreaseIcon}
          text2="156,5 RB"
          text3={"6,3%"}
          red={true}
        />
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
