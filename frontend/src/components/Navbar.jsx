import {
  faHome,
  faPlusSquare,
  faSignInAlt,
  faRegistered,
  faCog,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "./Sidebar";
import DropdownNavbar from "./DropdownNavbar";
import logoUser from "../imgs/user-128.png";
import { getProfile } from "../api/user.api";
import {
  setAvatarForShow,
  getProfileError,
  getProfileStart,
  getProfileSuccess,
} from "../redux/user.slice";
import ROUTES from "../constant/routes";
import { useProfile } from "../redux/selector";
const Navbar = () => {
  const currentUser = useSelector((state) => state.auth.signIn.currentUser);
  const profile = useProfile();
  const location = useLocation();
  const dispatch = useDispatch();

  const [showSidebar, setShowSidebar] = useState(false);
  const [height, setHeight] = useState(0);

  let dropdownRef = useRef();
  const sidebarRef = useRef();

  //---------------------------Close Dropdown Profile---------------------------
  function closeDropdown() {
    setHeight(0);
  }
  //------------------------------Close Sidebar Menu----------------------------
  function closeSidebar() {
    setShowSidebar(false);
  }
  //--------------------------------UseEffect to close dropdown-----------------
  useEffect(() => {
    /**
     * If the dropdown menu is open and the user clicks outside of the dropdown, close the dropdown menu.
     */
    let handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        closeDropdown();
      }
    };
    document.addEventListener("mousedown", handler, height === "auto");
    return document.removeEventListener("mousedown", handler, height === 0);
  });

  //------------------------------UseEffect to close Sidebar--------------------
  useEffect(() => {
    /**
     * If the sidebar is open and the user clicks outside of the sidebar, close the sidebar.
     */
    let onClick = (e) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        closeSidebar();
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("mousedown", onClick, true);
    };
  });

  //-------------------------------Get Profile For Logged in User---------------
  useEffect(() => {
    dispatch(getProfileStart());
    currentUser &&
      getProfile(currentUser.token)
        .then((response) => {
          dispatch(getProfileSuccess(response.data));
          dispatch(setAvatarForShow(response.data.avatarUrl));
        })
        .catch((err) => {
          dispatch(getProfileError("Error getting profile"));
          console.log(err);
        });
    //eslint-disable-next-line
  }, [currentUser]);

  //----------------------------------List links for routers--------------------
  const links = [
    {
      name: "Home",
      path: ROUTES.ROOT,
      icon: faHome,
    },
    {
      name: "Create Recipe",
      path: ROUTES.RECIPE_CREATE,
      icon: faPlusSquare,
    },
    {
      name: "Sign in",
      path: ROUTES.AUTH_SIGN_IN,
      icon: faSignInAlt,
    },
    {
      name: "Sign up",
      path: ROUTES.AUTH_SIGN_UP,
      icon: faRegistered,
    },
    {
      name: "Profile",
      path: ROUTES.PROFILE_USER_INFORMATION,
      icon: faUser,
    },
    {
      name: "Setting",
      path: ROUTES.SETTINGS,
      icon: faCog,
    },
  ];

  return (
    <>
      <div className="navbar container">
        <Link to="/" className="logo">
          F<span>oo</span>dRecipe
        </Link>

        <div className="nav-links">
          <div className="nav-links-items">
            {[links[0], links[1]].map((link) => (
              <Link
                to={link.path}
                key={link.name}
                className={location.pathname === link.path ? "active" : ""}
              >
                {link.name}
              </Link>
            ))}
          </div>
          <div className="nav-links-main">
            {currentUser ? (
              <div ref={dropdownRef}>
                <div
                  className="user-pic"
                  onClick={() => setHeight(height === 0 ? "auto" : 0)}
                >
                  <img
                    src={profile.avatarUrl ? profile.avatarUrl : logoUser}
                    alt=""
                    aria-expanded={height !== 0}
                  />
                </div>
                <DropdownNavbar
                  height={height}
                  userInfo={profile.data}
                  closeDropdown={closeDropdown}
                />
              </div>
            ) : (
              <>
                {[links[5], links[2], links[3]].map((link) => (
                  <Link
                    to={link.path}
                    key={link.name}
                    className={location.pathname === link.path ? "active" : ""}
                  >
                    {link.name}
                  </Link>
                ))}
              </>
            )}
          </div>
        </div>
        <div
          ref={sidebarRef}
          onClick={() => setShowSidebar(!showSidebar)}
          className={showSidebar ? "sidebar-btn active" : "sidebar-btn"}
        >
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      </div>
      <div
        ref={sidebarRef}
        className={`sidebar-container${showSidebar ? " active" : ""}`}
      >
        {showSidebar && <Sidebar closeSidebar={closeSidebar} links={links} />}
      </div>
    </>
  );
};

export default Navbar;
