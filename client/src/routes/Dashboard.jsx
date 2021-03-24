import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import FullWidthTabs from "../components/FullWidthTabs";
import StyledButton from "../components/StyledButton";
import axios from "axios";
import { toast } from "react-toastify";

function Dashboard({ setAuth }) {
  const [uid, setUid] = useState("");

  useEffect(() => {
    function getId() {
      axios
        .get("/dash", {
          headers: { token: localStorage.token },
        })
        .then((res) => {
          if (res.data === "Not Authorized") {
            toast.warning("Session Ended Login Again");
            setTimeout(() => {
              window.location.href = "/";
            }, 10000);
          } else {
            setUid(res.data);
          }
        });
    }
    getId();
  });

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
      <FullWidthTabs id={uid}/>
    </div>
  );
}

export default Dashboard;
