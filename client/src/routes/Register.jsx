import React, { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";
import Text from "../components/Text";
import StyledButton from "../components/StyledButton";

function Register({ setAuth }) {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setUser((prevVal) => {
      return {
        ...prevVal,
        [name]: value,
      };
    });
  }

  function registerUser(event) {
    if (
      user.username === "" ||
      user.email === "" ||
      user.password === "" ||
      user.password2 === ""
    ) {
      toast.warning("Missing Credentials");
      setAuth(false);
    } else if (user.password !== user.password2) {
      toast.warning("Password Do Not Match");
      setAuth(false);
    } else {
      axios
        .post("https://the-benefactor.herokuapp.com/registerUser", {
          username: user.username,
          email: user.email,
          password: user.password,
        })
        .then((res) => {
          if (res.data.token) {
            localStorage.setItem("token", res.data.token);
            setAuth(true);
            toast.success("Successful Register");
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
      <h1 className="title">Registration</h1>
      <form className="reg">
        <Text
          label="Username"
          name="username"
          onChange={handleChange}
          autoFocus
          value={user.username}
        />
        <br />
        <br />
        <Text
          label="Email"
          name="email"
          onChange={handleChange}
          value={user.email}
        />
        <br />
        <br />
        <Text
          label="Password"
          name="password"
          onChange={handleChange}
          value={user.password}
          type="password"
        />
        <br />
        <br />
        <Text
          label="Confirm Password"
          name="password2"
          onChange={handleChange}
          value={user.password2}
          type="password"
        />
        <br />
        <br />
        <StyledButton size="large" margin="10px 0px 0px 170px" text="Register" onClick={registerUser} />
      </form>
    </div>
  );
}

export default Register;
