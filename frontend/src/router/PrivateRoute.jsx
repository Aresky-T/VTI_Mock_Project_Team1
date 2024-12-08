import React, { useEffect } from "react";
import { useAuth } from "../redux/selector";
import { useLocation, useNavigate } from "react-router-dom";
import ROUTES from "../constant/routes";

const PrivateRoute = (props) => {
  const location = useLocation();
  const auth = useAuth();
  const navigate = useNavigate();

  const currentUser = auth.signIn.currentUser;
  const path = location.pathname;

  useEffect(() => {
    if (!currentUser) {
      navigate(ROUTES.AUTH_SIGN_IN, { state: { previousPath: path } });
    }
  }, [currentUser, navigate, path]);

  return <>{props.children}</>;
};

export default PrivateRoute;
