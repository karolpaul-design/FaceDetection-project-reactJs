import React from "react";
import "./rank.styles.scss";

const Rank = ({ name, entries }) => {
  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  return (
    <div>
      {name ? (
        <div className="white text">{`${capitalize(
          name
        )}, your current entry count is  `}</div>
      ) : (
        <div className="white text">Your current entry count is</div>
      )}

      <div className="white head">{`${entries}`}</div>
    </div>
  );
};

export default Rank;
