import React from "react";
import "./App.css";
import Navigation from "./components/navigation/navigation.component";
import Logo from "./components/logo/logo.component";
import Rank from "./components/rank/rank.component";
import ImageLinkForm from "./components/imageLinkForm/imageLinkForm.component";
import FaceRecognition from "./components/faceRecognition/faceRecognition.component";

import SignIn from "./components/signIn/signIn.component";
import Register from "./components/register/register.component";

import { useState, useEffect } from "react";
import app from "../src/firebase/firebase.utils";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useAuth } from "../src/firebase/firebase.utils";

function App() {
  const [input, setInput] = useState("");
  const [imageURL, setImageURL] = useState("");

  const [homeRoute, setHomeRoute] = useState("signin");
  const [isSignedIn, setIsSignedIn] = useState(false);
  const currentUser = useAuth();

  const onInputChange = (e) => {
    setInput(e.target.value);
  };

  useEffect(() => {
    if (homeRoute === "signout") {
      setIsSignedIn(false);
    } else if (homeRoute === "home") {
      setIsSignedIn(true);
    }
  });
  const onRouteChange = (path) => {
    setHomeRoute(path);
  };

  return (
    <div className="App">
      <Navigation currentUser={currentUser} onRouteChange={onRouteChange} />
      {currentUser !== null ? (
        <div>
          <Logo />
          <Rank />
          <ImageLinkForm onInputChange={onInputChange} />

          <FaceRecognition imageURL={imageURL} />
        </div>
      ) : homeRoute === "signin" ? (
        <SignIn onRouteChange={onRouteChange} currentUser={currentUser} />
      ) : (
        <Register onRouteChange={onRouteChange} currentUser={currentUser} />
      )}
    </div>
  );
}

export default App;
