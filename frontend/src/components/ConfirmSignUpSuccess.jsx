import React from "react";
import { BsCheck } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearSignUpState } from "../redux/auth.slice";
const ConfirmSignUpSuccess = ({ successMessage, active }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const closePopup = () => {
    dispatch(clearSignUpState());
    navigate("/auth/sign-in");
  };

  return (
    <>
      {successMessage && (
        <div className="popup-container">
          <div className={active ? "popup active" : "popup"}>
            <div className="icon">
              <BsCheck id="bsCheck" size={50} />
            </div>
            <div className="title">Success!</div>
            <div className="description">{successMessage}</div>
            <div className="accept-btn">
              <button type="button" onClick={closePopup}>
                Accept
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ConfirmSignUpSuccess;
