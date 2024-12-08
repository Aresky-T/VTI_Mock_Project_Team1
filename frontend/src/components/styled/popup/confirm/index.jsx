import React from "react";
import PropTypes from "prop-types";

const CustomConfirmPopup = (props) => {
  return (
    <div
      className={`confirm-popup ${props.className || ""} ${
        props.active ? " active" : ""
      }`}
    >
      <div className="confirm-popup-wrapper">{props.children}</div>
    </div>
  );
};

CustomConfirmPopup.propTypes = {
  active: PropTypes.bool,
  className: PropTypes.string,
};

export default CustomConfirmPopup;
