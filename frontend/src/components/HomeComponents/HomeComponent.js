import React from "react";
import { useSelector } from "react-redux";
import ListRecipe from "./ListRecipe";
import Narbar from "./Navbar";

function HomeComponent(props) {
   let { handleSearch, handleShowRecipeDetail, handleShowListRecipe, handleShowCart } = props;
   let homeItem = useSelector((state) => state.homeRedux.homeItem);

   if (homeItem === 1) {
      homeItem = <ListRecipe handleShowRecipeDetail={handleShowRecipeDetail} />;
   }

   console.log("homeItem: ", homeItem);

   return (
      <div>
         <Narbar handleShowListRecipe={handleShowListRecipe} handleSearch={handleSearch} handleShowCart={handleShowCart} />
         <br></br>
         {homeItem}
      </div>
   );
}

export default HomeComponent;
