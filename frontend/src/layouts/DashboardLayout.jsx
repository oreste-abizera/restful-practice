import React from "react";
import logo from "../logo-sm.svg";
import icon1 from "../assets/icons/dashboard.svg";
import icon2 from "../assets/icons/register-owner.svg";
import icon3 from "../assets/icons/register-vehicle.svg";
import icon4 from "../assets/icons/history.svg";
import searchIcon from "../assets/icons/search.svg";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const DashboardLayout = ({ children }) => {
  const { user } = useContext(AppContext);
  const sidebarLinks = [
    { id: 1, name: "Dashboard", link: "/dashboard", icon: icon1 },
    { id: 2, name: "Register Owner", link: "/register-owner", icon: icon2 },
    { id: 3, name: "Register Vehicle", link: "/register-vehicle", icon: icon3 },
    { id: 4, name: "Vehicles List", link: "/vehicles", icon: icon3 },
    { id: 5, name: "Owners List", link: "/owners", icon: icon2 },
    { id: 6, name: "History", link: "/history", icon: icon4 },
  ];
  return (
    <div className="dashboard__layout">
      <div className="dashboard_layout__sidebar">
        <img
          src={logo}
          alt="logo"
          style={{ width: "48px", height: "48px", margin: "72px auto" }}
        ></img>
        {sidebarLinks.map((link) => (
          <Link to={link.link} key={link.id} style={{ textDecoration: "none" }}>
            <div className="dashboard_layout__sidebar__link">
              <img
                src={link.icon}
                alt="icon"
                style={{ width: "20px", height: "20px" }}
              />
              <span>{link.name}</span>
            </div>
          </Link>
        ))}
      </div>
      <div className="dashboard_layout__content">
        <div className="dashboard_layout__navbar">
          <div
            style={{
              height: "50px",
              width: "505px",
              borderRadius: "8px",
              backgroundColor: "#F4F9FF",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 24px",
              gap: "10px",
            }}
          >
            <input
              style={{
                flex: 1,
                outline: "none",
                border: "none",
                backgroundColor: "transparent",
                color: "#9AB1CC",
                fontWeight: "400",
                fontSize: "15px",
              }}
              placeholder="Search RRA Vehicles"
            ></input>
            <img src={searchIcon} alt=""></img>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <img
              src="https://s3-alpha-sig.figma.com/img/7665/64a2/ece116b6eaa88a1d826c01b3c0cdc5a3?Expires=1658102400&Signature=FD~d6SFnEugkOzuz~Zq3FfdXqUY-ExrUUTeRPbcIHHDsTl2rWquuAF1KcLVsuQexps8F32c6jtixidInHbjIo8CdjhtXo1qB5YZk37l1mwAoazcHGaIzNmzn2j21~HSmIsygAxVHwUjUn1HE~ulQ92qeVmpyRvReLTL0WchlVqF~PZx~nsjg92iBw2igkESrhNUbWTxvNpzK0xZ-D6cLJL0MsXGgQeOE2VCqlXxuad7OtkvDH-57-s5EWJFimfki0oxTCcnC105U8A-UA0R9rpASolq-tS6vA-3WVtyLwZEahTxgR4yK2DBmF8DvaiwIZ9Srr~G8Y0WFrs1FBENPew__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
              alt=""
              style={{ width: "40px", height: "40px", borderRadius: "50%" }}
            ></img>
            <div style={{}}>
              <p style={{ color: "#6484AA", fontWeight: "500" }}>
                {user?.info?.names || "JackWilder"}
              </p>
              <p
                style={{
                  color: "#C3CBD4",
                  fontWeight: "400",
                  fontSize: "12px",
                }}
              >
                Administrator
              </p>
            </div>
          </div>
        </div>

        <div>{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
