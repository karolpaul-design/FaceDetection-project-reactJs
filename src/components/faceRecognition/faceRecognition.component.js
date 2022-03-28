import React from "react";
import "./faceRecognition.styles.scss";
import { useContext } from "react";
import uniqid from "uniqid";
import { BoxParamsContext } from "../../App";
const FaceRecognition = ({ imageURL }) => {
  const boxsArr = useContext(BoxParamsContext);
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
