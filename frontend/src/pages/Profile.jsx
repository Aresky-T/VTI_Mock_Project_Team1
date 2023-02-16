import React from "react";
import { Outlet } from "react-router-dom";
import LeftProfile from "../components/ProfileComponent/LeftProfile";

function Profile(props) {
   return (
      <div className="profile-container">
         <LeftProfile/>
         <Outlet/>
      </div>
   );
}

export default Profile
