import React from "react";
import { Container } from "reactstrap";
import { useDispatch } from "react-redux";

import {
   acctionInputToCart,
   acctionOnPayment,
   acctionPayment,
   acctionShowCart,
   acctionShowListRecipe,
   acctionSubmitComment,
   acctionShowRecipeDetail,
} from "../redux/Acction/HomeAcction";
import HomeComponent from "../components/HomeComponents/HomeComponent";
function HomeContainer(props) {
   let dispathRedux = useDispatch();

   let handleShowListRecipe = () => {
      dispathRedux(acctionShowListRecipe);
   };
   let handleShowRecipeDetail = (recipeParam) => {
      console.log("recipe", recipeParam);
      dispathRedux(acctionShowRecipeDetail(recipeParam));
   };
   let handleInputToCart = (recipe) => {
      dispathRedux(acctionInputToCart(recipe));
   };
   let handleShowCart = (recipe) => {
      dispathRedux(acctionShowCart(recipe));
   };

   let handleOnPayment = () => {
      dispathRedux(acctionOnPayment());
   };
   let handlePayment = () => {
      dispathRedux(acctionPayment());
   };
   let handleSubmitComment = () => {
      dispathRedux(acctionSubmitComment());
   };

   return (
      <Container>
         <div>
            <HomeComponent
               handleInputToCart={handleInputToCart}
               handleShowCart={handleShowCart}
               handleOnPayment={handleOnPayment}
               handlePayment={handlePayment}
               handleSubmitComment={handleSubmitComment}
               handleShowListRecipe={handleShowListRecipe}
               handleShowRecipeDetail={handleShowRecipeDetail}
            />
         </div>
      </Container>
   );
}

export default HomeContainer;
