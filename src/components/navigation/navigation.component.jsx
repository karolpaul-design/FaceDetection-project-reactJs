import React from "react";
import "./navigation.styles.scss";
import { logOut } from "../../firebase/firebase.utils";
const Navigation = ({ onRouteChange, currentUser }) => {
  async function handleLogOut() {
    try {
      await logOut();
    } catch {
      alert("Error!");
    }
  }
  if (currentUser !== null) {
    return (
      <nav>
        <p
          onClick={handleLogOut}
          className="f3 link dim white underline pa3 pointer"
        >
          Sign Out
        </p>
      </nav>
    );
  } else {
    return (
      <nav>
        <p
          onClick={() => onRouteChange("signin")}
          className="f3 link dim white underline pa3 pointer"
        >
          Sign In
        </p>
        <p
          onClick={() => onRouteChange("register")}
          className="f3 link dim white underline pa3 pointer"
        >
          Register
        </p>
      </nav>
    );
  }
};

export default Navigation;
