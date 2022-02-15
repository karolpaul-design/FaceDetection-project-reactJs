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

function App() {
  const [input, setInput] = useState("");
  const [imageURL, setImageURL] = useState("");

  const [homeRoute, setHomeRoute] = useState("signin");
  const [isSignedIn, setIsSignedIn] = useState(false);

  const onInputChange = (e) => {
    setInput(e.target.value);
  };

  const onSubmit = () => {
    setImageURL(input);
    fetch(
      "https://api.clarifai.com/v2/models/face-detection/outputs",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        calculateFaceLocation(JSON.parse(result, null, 2).outputs[0].data);
      })

      .catch((error) => console.log("error", error));
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
      <Navigation isSignedIn={isSignedIn} onRouteChange={onRouteChange} />
      {homeRoute === "home" ? (
        <div>
          <Logo />
          <Rank />
          <ImageLinkForm onInputChange={onInputChange} onSubmit={onSubmit} />

          <FaceRecognition box={boxParams} imageURL={imageURL} />
        </div>
      ) : homeRoute === "signin" ? (
        <SignIn onRouteChange={onRouteChange} />
      ) : (
        <Register onRouteChange={onRouteChange} />
      )}
    </div>
  );
}

export default App;
