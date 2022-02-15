import React from "react";
import Tilt from "react-parallax-tilt";
import "./logo.styles.scss";
import logo from "./logo.png";

const Logo = () => {
  return (
    <div className="ma5 mt0">
      <Tilt
        className="Tilt parallax-effect br2 shadow-2"
        perspective={500}
        glareEnable={true}
        glareMaxOpacity={0.3}
        glareColor="lightblue"
        glarePosition="all"
      >
        <img className="logo-img" alt="logo" src={logo} />
      </Tilt>
    </div>
  );
};

export default Logo;
