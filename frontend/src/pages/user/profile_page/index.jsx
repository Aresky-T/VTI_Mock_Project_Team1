import React from "react";
import { Outlet } from "react-router-dom";
// import LeftProfile from "../../../components/ProfileComponent/LeftProfile";

const ProfilePage = () => {
  return (
    <div className="container main session profile-page">
      <div className="profile-container">
        <Outlet />
      </div>
    </div>
  );
};

export default ProfilePage;
