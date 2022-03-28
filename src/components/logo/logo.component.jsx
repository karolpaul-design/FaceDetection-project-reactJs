import React from "react";
import "./logo.styles.scss";
import logo from "./logo.png";

const Logo = () => {
  return (
    <div className="mh5 mv4 mt0">
      <div className="Tilt parallax-effect br2 shadow-2">
        <img className="logo-img" alt="logo" src={logo} />
      </div>
    </div>
  );
};

export default Logo;
