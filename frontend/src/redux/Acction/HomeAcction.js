import { SUBMITCOMMENT, INPUTTOCART, ONPAYMENT, PAYMENT, SHOWCART, SHOWLISTRECIPE, SHOWRECIPEDETAIL, VOTE } from "../Contants/HomeContants";
import { getListRecipeAPI, getRecipeByNameAPI } from "../../api/RecipeAPI";

export let acctionShowListRecipe = () => {
   console.log("listRecipesParam");
   return (dispatch) => {
      getListRecipeAPI().then((response) => {
         console.log("listRecipesParam");
         // localStorage.setItem("listRecipe", JSON.stringify(response));
         dispatch(acctionGetListRecipeRedux());
      });
   };
};

export let acctionGetListRecipeRedux = (listRecipesParam) => {
   console.log("listRecipesParam", listRecipesParam);
   return {
      type: SHOWLISTRECIPE,
      payload: listRecipesParam,
   };
};

export let acctionSearchByName = (NameParam) => {
   return (dispatch) => {
      getRecipeByNameAPI(NameParam).then((response) => {
         dispatch(acctionGetListRecipeRedux(response));
      });
   };
};
export let acctionShowRecipeDetail = (recipe) => {
   console.log("listRecipesParam");
   return {
      type: SHOWRECIPEDETAIL,
      payload: recipe,
   };
};
export let acctionInputToCart = () => {
   return {
      type: INPUTTOCART,
   };
};
export let acctionShowCart = () => {
   return {
      type: SHOWCART,
   };
};
// export let acctionShowListRecipe = () => {
//    console.log("listRecipesParam");
//    return {
//       type: SHOWLISTRECIPE,
//    };
// };
export let acctionOnPayment = () => {
   return {
      type: ONPAYMENT,
   };
};
export let acctionPayment = () => {
   return {
      type: PAYMENT,
   };
};
export let acctionVote = () => {
   return {
      type: VOTE,
   };
};
export let acctionSubmitComment = () => {
   return {
      type: SUBMITCOMMENT,
   };
};
