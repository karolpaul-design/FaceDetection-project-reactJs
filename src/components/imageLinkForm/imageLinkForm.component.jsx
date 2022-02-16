import React from "react";
import "./imageLinkForm.styles.scss";

const ImageLinkForm = ({ onInputChange, onSubmit }) => {
  return (
    <div>
      <p className="text tc dark-blue">
        This Magic Science will detect faces in your pictures. Give it a try
      </p>
      <div className="centered">
        <div className="form flex pa4 br3 shadow-5">
          <input
            onChange={onInputChange}
            className="input f4 pa2  center"
            type="text"
          />
          <button
            onClick={onSubmit}
            className="button w-30 grow f4 link  pv2 dib white bg-purple"
          >
            Detect
          </button>
        </div>
      </div>
    </div>
  );
};
export default ImageLinkForm;
