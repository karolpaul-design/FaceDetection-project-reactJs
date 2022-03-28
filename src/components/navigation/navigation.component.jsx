import React from "react";
import "./navigation.styles.scss";
// import { logOut } from "../../firebase/firebase.utils";
import { useRouteUpdate } from "../../RouteContext";
const Navigation = ({ isSignedIn }) => {
  const onRouteChange = useRouteUpdate();

  if (isSignedIn === true) {
    return (
      <nav>
        <p
          onClick={() => onRouteChange("signin")}
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
