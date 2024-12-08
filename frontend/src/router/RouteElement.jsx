import React, { useEffect } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import ROUTES from "../constant/routes";

const RouteElement = ({ children, parentTitle, title, path, params }) => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  useEffect(() => {
    if (currentPath === path) {
      document.title = parentTitle ? parentTitle + " | " + title : title;
    }
  }, [title, parentTitle, currentPath, path]);

  useEffect(() => {
    if (!params || !params.length) return;

    for (const requiredParam of params) {
      if (!searchParams.has(requiredParam)) {
        navigate(ROUTES.ROOT);
      }
    }

    //eslint-disable-next-line
  }, [params, searchParams]);

  return <>{children}</>;
};

export default RouteElement;
