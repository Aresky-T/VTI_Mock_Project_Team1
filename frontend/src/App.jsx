import React, { useCallback, useEffect } from "react";
import AppRouter from "./router";
import { useAuth } from "./redux/selector";
import { signOutUser, validateAccessTokenApi } from "./api/auth.api";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const App = () => {
  const auth = useAuth();
  const currentUser = auth.signIn.currentUser;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleValidateUserAccessToken = useCallback(() => {
    const token = currentUser?.token;
    if (!token) return;

    validateAccessTokenApi(token)
      .then()
      .catch(() => {
        signOutUser(dispatch, navigate);
      });
  }, [currentUser, dispatch, navigate]);

  useEffect(() => {
    handleValidateUserAccessToken();
  }, [handleValidateUserAccessToken]);

  return <AppRouter />;
};

export default App;
