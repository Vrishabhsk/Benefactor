import React from "react";
import { Link } from "react-router-dom";
import icon from "../icons/graduate-hat.png";
import StyledButton from "../components/StyledButton";

function Navbar(props) {
  try {
    return (
      <div>
        <nav className="navbar">
          <div>
            <Link to="/#">
              <img src={icon} className="token" alt="token"></img>
            </Link>
          </div>
          <div className="heading">Benefactor</div>
          {props.isHome ? (
            <div>
              <Link to="/Login" className="links">
                <StyledButton text="Login" />
              </Link>
              <Link to="/Register" className="links margin">
                <StyledButton text="Register" />
              </Link>
            </div>
          ) : (
            <></>
          )}
          {props.isReg ? (
            <Link to="/#" className="links">
              <StyledButton text="Home" />
            </Link>
          ) : (
            <></>
          )}
          {props.isDash ? (
            <Link to="/Dashboard" className="links">
              <StyledButton text="Dashboard" />
            </Link>
          ) : (
            <></>
          )}
        </nav>
      </div>
    );
  } catch (error) {
    if (error) console.log(error);
  }
}

export default Navbar;
