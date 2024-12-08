import { useFormik } from "formik";
import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import * as yup from "yup";
import { signInUserApi } from "../../api/auth.api";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MdError } from "react-icons/md";
import { signInSuccess, clearRedux, signInError } from "../../redux/auth.slice";
import swal from "sweetalert";
import { offLoading } from "../../redux/loading.slice";
import userImage from "../../imgs/user-128.png";
import imageUrl from "../../assets/img/notebook-pencil-recipe-seasoning-wallpaper-preview.jpg";
import { useAuth } from "../../redux/selector";
import ROUTES from "../../constant/routes";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useAuth();
  const location = useLocation();

  const errorMessage = auth.signIn.signInErrorMessage;
  const previousPath = location.state?.previousPath;

  const handleLogin = (formData) => {
    signInUserApi(formData, dispatch)
      .then((res) => {
        if (!res.data.token) {
          const warning =
            "Your account is not active. Please check your email to activate account!";
          dispatch(offLoading());
          swal({
            title: "Warning!",
            text: warning,
            icon: "warning",
            buttons: "OK",
            // timer: 3000,
          });
        } else {
          localStorage.setItem("userLoggedIn", JSON.stringify(res.data));
          dispatch(signInSuccess(res.data));
          dispatch(offLoading());
          navigate(previousPath ?? ROUTES.ROOT);
        }
      })
      .catch((err) => {
        dispatch(offLoading());
        dispatch(
          signInError("Username or password invalid. Please try again!")
        );
      });
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: yup.object().shape({
      username: yup.string().required("Required"),
      password: yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      handleLogin(values);
    },
  });

  return (
    <div className="container-signin">
      <div className="container-signin-img">
        <img src={imageUrl} alt="signin-img" />
      </div>
      <div className="wrap-signin">
        <form className="signin-form" onSubmit={formik.handleSubmit}>
          <span className="signin-form-title">Sign In</span>
          <span className="signin-form-avatar">
            <img src={userImage} alt="" />
          </span>
          <div className="wrap-input">
            <input
              type="text"
              id="username"
              name="username"
              value={formik.values.username}
              onChange={(e) => {
                formik.handleChange(e);
                dispatch(clearRedux());
              }}
              className="input"
              placeholder="Username"
              autoComplete="username"
            />
            <label htmlFor="username" className="form-label">
              Username
            </label>
          </div>
          <div className="wrap-input">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formik.values.password}
              className="input"
              onChange={(e) => {
                formik.handleChange(e);
                dispatch(clearRedux());
              }}
              placeholder="Password"
              autoComplete="current-password"
            />
            <span
              className="btn-eye"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
            </span>
            <label htmlFor="password" className="form-label">
              Password
            </label>
          </div>
          <div className="error-message">
            {errorMessage && (
              <span>
                <MdError /> {errorMessage}
              </span>
            )}
          </div>
          <div className="signin-form-btn">
            <button type="submit" className="signin-btn">
              Sign In
            </button>
          </div>
          <ul className="signin-more">
            <li>
              <span className="txt1"> ⭐ Forgot </span>
              <Link className="txt2"> Username / Password </Link>
            </li>
            <li>
              <span className="txt1"> ⭐ Don't have an account? </span>
              <Link className="txt2" to="/auth/sign-up">
                {" "}
                Sign up
              </Link>
            </li>
          </ul>
        </form>
      </div>
      {/* <ToastContainer /> */}
    </div>
  );
};

export default SignIn;
