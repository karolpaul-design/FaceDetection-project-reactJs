import React from "react";

import { useState, useEffect } from "react";
import "./App.css";

import Navigation from "./components/navigation/navigation.component";
import Logo from "./components/logo/logo.component";
import Rank from "./components/rank/rank.component";
import ImageLinkForm from "./components/imageLinkForm/imageLinkForm.component";
import FaceRecognition from "./components/faceRecognition/faceRecognition.component";
import SignIn from "./components/signIn/signIn.component";
import Register from "./components/register/register.component";
import { useAuth } from "../src/firebase/firebase.utils";
import { useRoute } from "./RouteContext";
import Particles from "react-tsparticles";
import {
  particlesInit,
  particlesOptions,
  particlesLoaded,
} from "./assets/particles/particles.options";

export const BoxParamsContext = React.createContext();

function App() {
  const [input, setInput] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [boxParams, setBoxParams] = useState([]);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: "",
  });
  const homeRoute = useRoute();

  //Firebase
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

  //Events
  const onSubmit = () => {
    setImageURL(input);
    setBoxParams([]);
    fetch(
      "https://api.clarifai.com/v2/models/face-detection/outputs",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        if (result) {
          fetch("http://localhost:3000/image", {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: user.id,
            }),
          })
            .then((response) => response.json())
            .then((count) => {
              setUser(Object.assign(user, { entries: count }));

              calculateFaceLocation(
                JSON.parse(result, null, 2).outputs[0].data
              );
            });
        }
      })
      .catch((error) => console.log("error", error));
  };

  const onInputChange = (e) => {
    setInput(e.target.value);
  };

  const loadUser = (data) => {
    setUser({
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined,
    });
  };

  useEffect(() => {
    if (homeRoute !== "home") {
      setIsSignedIn(false);
      setImageURL("");
      setBoxParams([]);
    } else {
      setIsSignedIn(true);
    }
  }, [homeRoute]);

  return (
    <div className="App">
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={particlesOptions}
      />
      <Navigation currentUser={currentUser} isSignedIn={isSignedIn} />

      <BoxParamsContext.Provider value={boxParams}>
        {homeRoute === "home" ? (
          <div>
            <Logo />
            <Rank name={user.name} entries={user.entries} />
            <ImageLinkForm onInputChange={onInputChange} onSubmit={onSubmit} />
            <FaceRecognition imageURL={imageURL} />
          </div>
        ) : homeRoute === "signin" ? (
          <SignIn loadUser={loadUser} />
        ) : (
          <Register currentUser={currentUser} loadUser={loadUser} />
        )}
      </BoxParamsContext.Provider>
    </div>
  );
}

export default App;
