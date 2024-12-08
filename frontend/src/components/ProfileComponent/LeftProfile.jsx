import React from "react";
import {
  faUserAlt,
  faListUl,
  faCoins,
  faCog,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ROUTES from "../../constant/routes";

const SideBarProfile = () => {
  const location = useLocation();

  const links = [
    {
      name: "User information",
      path: ROUTES.PROFILE_USER_INFORMATION,
      icon: faUserAlt,
    },
    {
      name: "Account",
      path: ROUTES.PROFILE_ACCOUNT_INFO,
      icon: faCog,
    },
    {
      name: "Recipe management",
      path: ROUTES.PROFILE_RECIPE_MANAGEMENT,
      icon: faListUl,
    },
    {
      name: "Recipe exchange history",
      path: ROUTES.PROFILE_RECIPE_EXCHANGE_HISTORY,
      icon: faCoins,
    },
  ];

  return (
    <div className="profile-header">
      <div className="profile-header-links">
        {links.map((link, index) => (
          <Link
            to={link.path}
            key={index}
            className={
              location.pathname === link.path
                ? "profile-link active"
                : "profile-link"
            }
          >
            <FontAwesomeIcon icon={link.icon} className="profile-icon" />
            {link.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SideBarProfile;
