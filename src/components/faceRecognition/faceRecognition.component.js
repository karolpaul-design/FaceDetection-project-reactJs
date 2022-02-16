import React from "react";
import "./faceRecognition.styles.scss";
import uniqid from "uniqid";
const FaceRecognition = ({ imageURL, boxsArr }) => {
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
        {boxsArr.map(({ topRow, leftCol, bottomRow, rightCol }) => {
          const insetParams = `${topRow}% ${rightCol}% ${bottomRow}% ${leftCol}%`;
          return (
            <div
              key={uniqid()}
              className="bounding-box"
              style={{ inset: insetParams }}
            ></div>
          );
        })}
      </div>
    </div>
  );
};

export default FaceRecognition;
