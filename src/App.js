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
  const [boxParams, setBoxParams] = useState([]);
  const [homeRoute, setHomeRoute] = useState("signin");
  const [isSignedIn, setIsSignedIn] = useState(false);
  const currentUser = useAuth();
  //Clarifai
  const raw = JSON.stringify({
    user_app_id: {
      user_id: "nr0fr3ox7eo4",
      app_id: "06db94d50ffa41db88fb89927abdf6d3",
    },
    inputs: [
      {
        data: {
          image: {
            url: input,
          },
        },
      },
    ],
  });
  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: "Key 21eb39b5a89c492ea60e93e1487a0a14",
    },
    body: raw,
  };

  const calculateFaceLocation = (data) => {
    let result = [];

    const clarifaiFacesArr = data.regions.map(
      (item) => item.region_info.bounding_box
    );
    const image = document.getElementById("inputImage");
    const width = +image.width;
    const height = +image.height;
    console.log(width, height);
    clarifaiFacesArr.forEach((item) => {
      result.push({
        topRow: item.top_row * 100,
        leftCol: item.left_col * 100,
        bottomRow: 100 - item.bottom_row * 100,
        rightCol: 100 - item.right_col * 100,
      });
    });
    setBoxParams(result);
  };

  const onSubmit = () => {
    setImageURL(input);
    setBoxParams([]);
    fetch(
      "https://api.clarifai.com/v2/models/face-detection/outputs",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        calculateFaceLocation(JSON.parse(result, null, 2).outputs[0].data);
        console.log(JSON.parse(result, null, 2).outputs);
      })

      .catch((error) => console.log("error", error));
  };

  const onInputChange = (e) => {
    setInput(e.target.value);
  };

  const onRouteChange = (path) => {
    setHomeRoute(path);
  };

  useEffect(() => {
    if (homeRoute === "signout") {
      setIsSignedIn(false);
    } else if (homeRoute === "home") {
      setIsSignedIn(true);
    }
  }, [homeRoute]);

  return (
    <div className="App">
      <Navigation currentUser={currentUser} onRouteChange={onRouteChange} />
      {currentUser !== null ? (
        <div>
          <Logo />
          <Rank />
          <ImageLinkForm onInputChange={onInputChange} onSubmit={onSubmit} />

          <FaceRecognition boxsArr={boxParams} imageURL={imageURL} />
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
