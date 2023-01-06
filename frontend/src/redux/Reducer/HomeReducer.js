import React from "react";
import Cart from "../../components/HomeComponents/Cart";
import RecipeDetail from "../../components/HomeComponents/RecipeDetail";

const initallState = {
   homeItem: 1,
   listRecipes: "",
   recipeDetail: "",
   cart: "",
};
function HomeReducer(state = initallState, acction) {
   switch (acction.type) {
      case "SHOWLISTRECIPE":
         return {
            ...state,
            homeItem: 1,
            listRecipes: acction.payload,
         };
      case "SHOWRECIPEDETAIL":
         return {
            ...state,
            homeItem: <RecipeDetail />,
            recipeDetail: acction.payload,
         };
      case "SHOWCART":
         return {
            ...state,
            homeItem: <Cart />,
         };

      default:
         return { ...state };
   }
}

export default HomeReducer;
