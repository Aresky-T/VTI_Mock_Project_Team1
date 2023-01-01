import { SUBMITCOMMENT, INPUTTOCART, ONPAYMENT, PAYMENT, SHOWCART, SHOWLISTRECIPE, SHOWRECIPEDETAIL, VOTE } from "../Contants/HomeContants";
import getListRecipeAPI from "../../api/RecipeAPI";

export let acctionShowListRecipe = () => {
   return (dispatch) => {
      getListRecipeAPI().then((response) => {
         // localStorage.setItem("listRecipe", JSON.stringify(response));
         dispatch(acctionGetListRecipeRedux(response));
      });
   };
};
export let acctionGetListRecipeRedux = (listRecipesParam) => {
   return {
      type: SHOWLISTRECIPE,
      payload: listRecipesParam,
   };
};
export let acctionShowRecipeDetail = (recipe) => {
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
