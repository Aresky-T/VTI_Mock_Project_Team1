import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { signOutUser } from "../api/auth.api";

function Sidebar({ links, closeSidebar }) {
  const sidebarRef = useRef();
  const currentUser = useSelector((state) => state.auth.signIn.currentUser);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (event) => {
      if (event.target && !sidebarRef.current.contains(event.target)) {
        closeSidebar();
      }
    };

    if (sidebarRef.current) {
      document.addEventListener("mousedown", handler);

      return () => document.removeEventListener("mousedown", handler);
    }
  });

  return (
    <div className="sidebar" ref={sidebarRef}>
      {[links[0], links[1], links[5]].map((link, index) => (
        <Link
          to={link.path}
          className={
            location.pathname === link.path
              ? "sidebar-link active"
              : "sidebar-link"
          }
          key={index}
          onClick={closeSidebar}
        >
          <FontAwesomeIcon icon={link.icon} />
          {link.name}
        </Link>
      ))}
      {currentUser ? (
        <>
          <Link
            to={links[4].path}
            className={
              location.pathname === links[4].path
                ? "sidebar-link active"
                : "sidebar-link"
            }
            onClick={closeSidebar}
          >
            <FontAwesomeIcon icon={links[4].icon} />
            {links[4].name}
          </Link>
          <div
            className="sidebar-link"
            onClick={() => {
              signOutUser(dispatch, navigate);
              closeSidebar();
            }}
          >
            <FontAwesomeIcon icon={faSignOutAlt} />
            Sign out
          </div>
        </>
      ) : (
        [links[2], links[3]].map((link) => (
          <Link
            to={link.path}
            className={
              location.pathname === link.path
                ? "sidebar-link active"
                : "sidebar-link"
            }
            key={link.name}
            onClick={closeSidebar}
          >
            <FontAwesomeIcon icon={link.icon} />
            {link.name}
          </Link>
        ))
      )}
    </div>
  );
}

export default Sidebar;
