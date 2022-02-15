import React from "react";
import "./faceRecognition.styles.scss";
const FaceRecognition = ({ imageURL }) => {
  return (
    <div className="center ma">
      <div className="absolute mt2">
        <img
          id="inputImage"
          alt=""
          src={imageURL}
          width="500px"
          height="auto"
        />
        <div className="bounding-box "></div>
      </div>
    </div>
  );
};

export default FaceRecognition;
