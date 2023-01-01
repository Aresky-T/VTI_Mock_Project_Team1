import {
   CHANGEPASSWORD,
   CREATERECIPE,
   LISTRECIPE,
   RECHARGEMONEY,
   SHOWINFOR,
   TRANSACTIONHISTORY,
   USERRECIPEDETAIL,
   WITHDRAWMONEY,
} from "../Contants/ProfileContants";

export let acctionShowInfor = () => {
   return {
      type: SHOWINFOR,
   };
};
export let acctionChangPassword = () => {
   return {
      type: CHANGEPASSWORD,
   };
};
export let acctionShowListRecipe = () => {
   return {
      type: LISTRECIPE,
   };
};
export let acctionCreateRecipe = () => {
   return {
      type: CREATERECIPE,
   };
};
export let acctionRechargeMoney = () => {
   return {
      type: RECHARGEMONEY,
   };
};
export let acctionWithdrawMoney = () => {
   return {
      type: WITHDRAWMONEY,
   };
};
export let acctionShowTransactionHistory = () => {
   return {
      type: TRANSACTIONHISTORY,
   };
};
export let acctionShowUserRecipeDetail = () => {
   return {
      type: USERRECIPEDETAIL,
   };
};
