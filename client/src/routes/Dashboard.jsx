import React from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import FullWidthTabs from "../components/FullWidthTabs";
import StyledButton from "../components/StyledButton";

function Dashboard({ setAuth }) {
  return (
    <div>
      <Navbar isReg={true} />
      <Link
        className="links margin"
        to="/"
        onClick={() => {
          localStorage.removeItem("token");
          setAuth(false);
        }}
      >
        <StyledButton text="Logout" />
      </Link>
      <FullWidthTabs />
    </div>
  );
}

export default Dashboard;
