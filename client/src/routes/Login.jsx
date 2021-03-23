import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";
import axios from "axios";
import Text from "../components/Text";
import StyledButton from "../components/StyledButton";

function Login({ setAuth }) {
  const [login, setLogin] = useState({
    username: "",
    password: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setLogin((prevVal) => {
      return {
        ...prevVal,
        [name]: value,
      };
    });
  }

  function handleSubmit(event) {
    if (login.username === "" || login.password === "") {
      event.preventDefault();
      toast.warning("Missing Credentials");
      setAuth(false);
    } else {
      axios
        .post("/loginUser", {
          username: login.username,
          password: login.password,
        })
        .then((res) => {
          if (res.data.token) {
            localStorage.setItem("token", res.data.token);
            setAuth(true);
            toast.success("SuccessFul Login");
          } else {
            setAuth(false);
            toast.error(res.data);
          }
        });
    }
  }

  return (
    <div>
      <Navbar isHome={false} isReg={true} />
      <h1 className="title">Login</h1>
      <form className="reg">
        <Text
          label="Username"
          name="username"
          value={login.username}
          onChange={handleChange}
          autoFocus
        />
        <br />
        <br />
        <Text
          label="Password"
          name="password"
          value={login.password}
          onChange={handleChange}
          type="password"
        />
        <br />
        <br />
        <StyledButton size="large" margin="10px 0px 0px 170px" text="Login" onClick={handleSubmit} />
      </form>
    </div>
  );
}

export default Login;
