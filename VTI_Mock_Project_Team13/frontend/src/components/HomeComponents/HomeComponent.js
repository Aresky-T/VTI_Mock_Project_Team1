import React from "react";
import { useSelector } from "react-redux";
import ListRecipe from "./ListRecipe";
import Narbar from "./Navbar";

function HomeComponent(props) {
   let { handleShowRecipeDetail, handleShowListRecipe, handleInputToCart, handleShowCart, handleOnPayment, handlePayment, handleSubmitComment } = props;
   let homeItem = useSelector((state) => state.homeRedux.homeItem);
   if (homeItem === 1) {
      homeItem = (
         <ListRecipe
            handleInputToCart={handleInputToCart}
            handleOnPayment={handleOnPayment}
            handlePayment={handlePayment}
            handleSubmitComment={handleSubmitComment}
            handleShowListRecipe={handleShowListRecipe}
            handleShowRecipeDetail={handleShowRecipeDetail}
         />
      );
   }
   console.log("homeItem: ", homeItem);

   return (
      <div>
         <Narbar handleShowCart={handleShowCart} />
         <br></br>
         {homeItem}
      </div>
   );
}

export default HomeComponent;
