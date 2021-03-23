import React from "react";
import Navbar from "../components/Navbar";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import icon from "../icons/1.png";
import icon2 from "../icons/2.png";
import Footer from "../components/Footer";

function Home({ isAuth }) {
  return (
    <div>
      <Navbar isHome={!isAuth} isDash={isAuth} />
      <img src={icon} alt="academics" className="icon" />
      <h2 className="l1">
        WELCOME TO THE BENEFACTOR
        <br />
        <br />
        <ArrowRightIcon /> MANAGE ALL YOUR ASSIGNMENTS
        <br />
        <ArrowRightIcon /> RECORD YOUR GRADES
        <br />
        <ArrowRightIcon /> KEEP TRACK OF YOUR ATTENDANCE
        <br />
        <br />
        ALL THAT A STUDENT NEEDS FREE OF COST
      </h2>
      <h2 className="l2">
        FEATURES:
        <br />
        <br />
        <ArrowRightIcon /> SOPHISTICATED UI
        <br />
        <ArrowRightIcon /> EASY TO USE
        <br />
        <ArrowRightIcon /> CLEAN DESIGN
        <br />
        <ArrowRightIcon /> OPEN SOURCE
      </h2>
      <img src={icon2} alt="academics" className="icon2" />
      <Footer />
    </div>
  );
}

export default Home;
