import React, { useCallback, useEffect, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { signInUserApi } from "../../api/auth.api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../../redux/auth.slice";
import { MdClose } from "react-icons/md";
import ValidateUtils from "../../utils/validate2";
import { toast } from "react-toastify";

const ModalLogin = ({ isActive, onClose, redirectTo }) => {
  const [formLogin, setFormLogin] = useState({
    username: "",
    password: "",
  });
  const [isValid, setIsValid] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  // const [activeSubmitButton, setActiveSubmitButton] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChangeForm = (e) => {
    const { name, value } = e.target;
    setFormLogin((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleValidateForm = useCallback(() => {
    const validator = new ValidateUtils(formLogin);

    validator.required("username");
    validator.notEmpty("username");

    validator.required("password");
    validator.notEmpty("password");

    const { isValid } = validator.validate();
    setIsValid(isValid);
  }, [formLogin]);

  const closeModal = () => {
    onClose();
    redirectTo && navigate(redirectTo);
  };

  const handleSubmitLogin = () => {
    setIsProcessing(true);
    signInUserApi(formLogin)
      .then((res) => {
        if (res.data.status !== "ACTIVE") {
          toast.error(
            "Your account is not active. Please check your email to activate account!"
          );
          // const warning =
          //   "Your account is not active. Please check your email to activate account!";
          // swal({
          //   title: "Warning!",
          //   text: warning,
          //   icon: "warning",
          //   buttons: "OK",
          // });
        } else {
          localStorage.setItem("userLoggedIn", JSON.stringify(res.data));
          dispatch(signInSuccess(res.data));
          toast.success("Login success!", { position: "top-center" });
        }
      })
      .catch((err) => {
        toast.error("Invalid username or password. Please try again!");
      });
  };

  useEffect(() => {
    if (isProcessing) {
      const timeout = setTimeout(() => {
        setIsProcessing(false);
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [isProcessing]);

  useEffect(() => {
    handleValidateForm();
  }, [handleValidateForm]);

  return (
    <div className={`modal-page${isActive ? " active" : ""}`}>
      <div className="modal-container">
        <button className="modal-close-btn" onClick={closeModal}>
          <MdClose />
        </button>
        <div className="modal-header">
          <h2>Sign in</h2>
        </div>
        <form className="modal-body">
          <div>
            <label>Username: </label>
            <input
              name="username"
              type="text"
              value={formLogin.username}
              autoComplete="username"
              placeholder="Enter your username"
              onChange={handleChangeForm}
            />
          </div>
          <div>
            <label>Password: </label>
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              value={formLogin.password}
              onChange={handleChangeForm}
              placeholder="Enter your password"
            />
            <span className="eye-icon">
              {showPassword ? (
                <AiFillEye onClick={() => setShowPassword(!showPassword)} />
              ) : (
                <AiFillEyeInvisible
                  onClick={() => setShowPassword(!showPassword)}
                />
              )}
            </span>
          </div>
        </form>
        <div className="modal-footer">
          <button
            onClick={handleSubmitLogin}
            type="button"
            className={`btn-submit${isValid && !isProcessing ? " active" : ""}`}
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

const useLoginModal = (redirect) => {
  const [isActive, setIsActive] = useState(false);
  const actions = {
    onActive: () => setIsActive(true),
    onClose: () => setIsActive(false),
  };

  return {
    actions,
    ModalLogin: () => (
      <ModalLogin
        isActive={isActive}
        redirectTo={redirect}
        onClose={actions.onClose}
      />
    ),
  };
};

export default useLoginModal;
