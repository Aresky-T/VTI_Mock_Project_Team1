import React from "react";
import { useSelector } from "react-redux";
import ListRecipe from "./ListRecipe";

function RightProfile(props) {
   let { handleShowUserRecipeDetail } = props;

   let rightProfileItem = useSelector((state) => state.profileRedux.profileRightItem);
   if (rightProfileItem === 1) {
      rightProfileItem = <ListRecipe handleShowUserRecipeDetail={handleShowUserRecipeDetail} />;
   }
   return <div>{rightProfileItem}</div>;
}
export default RightProfile;
