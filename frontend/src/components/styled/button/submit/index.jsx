import React from "react";
import StyledSubmitButton from "../StyledSubmitButton";

const SubmitButton = ({ className, type, active, value, onSubmit }) => {
  return (
    <StyledSubmitButton
      className={`styled-submit-btn ${active ? "active" : ""} ${
        className ? className : ""
      }`}
      type={type || "button"}
      onClick={onSubmit}
    >
      {value}
    </StyledSubmitButton>
  );
};

export default SubmitButton;
