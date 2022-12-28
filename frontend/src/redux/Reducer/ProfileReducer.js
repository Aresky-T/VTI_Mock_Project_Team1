import React from "react";
import CreateRecipe from "../../Component/UserProfileComponent/CreateRecipe";
import UserInfor from "../../Component/UserProfileComponent/UserInfor";
import ChangePassword from "../../Component/UserProfileComponent/ChangePassword";
import RechargeMoney from "../../Component/UserProfileComponent/RechargeMoney";
import WithdrawMoney from "../../Component/UserProfileComponent/WithdrawMoney";
import TransactionHistory from "../../Component/UserProfileComponent/TransactionHistory";
import UserRecipeDetail from "../../Component/UserProfileComponent/UserRecipeDetail";

const initallState = {
   profileRightItem: <UserInfor />,
};
function HomePageReducer(state = initallState, acction) {
   switch (acction.type) {
      case "SHOWINFOR":
         return {
            ...state,
            profileRightItem: <UserInfor />,
         };
      case "CHANGEPASSWORD":
         return {
            ...state,
            profileRightItem: <ChangePassword />,
         };
      case "LISTRECIPE":
         return {
            ...state,
            profileRightItem: 1,
         };
      case "CREATERECIPE":
         return {
            ...state,
            profileRightItem: <CreateRecipe />,
         };
      case "RECHARGEMONEY":
         return {
            ...state,
            profileRightItem: <RechargeMoney />,
         };
      case "WITHDRAWMONEY":
         return {
            ...state,
            profileRightItem: <WithdrawMoney />,
         };
      case "TRANSACTIONHISTORY":
         return {
            ...state,
            profileRightItem: <TransactionHistory />,
         };
      case "USERRECIPEDETAIL":
         return {
            ...state,
            profileRightItem: <UserRecipeDetail />,
         };
      default:
         return { ...state };
   }
}

export default HomePageReducer;
