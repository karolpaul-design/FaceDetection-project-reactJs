import React, { useState, useContext } from "react";

const RouteContext = React.createContext();
const RouteUpdateContext = React.createContext();

export function useRoute() {
  return useContext(RouteContext);
}
export function useRouteUpdate() {
  return useContext(RouteUpdateContext);
}

export function RouteProvider({ children }) {
  const [homeRoute, setHomeRoute] = useState("signin");

  function onRouteChange(path) {
    setHomeRoute(path);
  }
  return (
    <RouteContext.Provider value={homeRoute}>
      <RouteUpdateContext.Provider value={onRouteChange}>
        {children}
      </RouteUpdateContext.Provider>{" "}
    </RouteContext.Provider>
  );
}
