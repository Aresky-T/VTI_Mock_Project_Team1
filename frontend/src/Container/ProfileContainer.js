import React from "react";
import { useDispatch } from "react-redux";
import { Container } from "reactstrap";
import UserProfile from "../components/UserProfileComponent/UserProfile";
import {
   acctionChangPassword,
   acctionCreateRecipe,
   acctionRechargeMoney,
   acctionShowInfor,
   acctionShowListRecipe,
   acctionShowTransactionHistory,
   acctionShowUserRecipeDetail,
   acctionWithdrawMoney,
} from "../redux/Acction/ProfileAcction";
// import dataContext from "./Context/DataContext";

function ProfileContainer(props) {
   let dispathRedux = useDispatch();

   let handleShowUserInfor = () => {
      dispathRedux(acctionShowInfor());
   };
   let onhandleChangPassword = () => {
      dispathRedux(acctionChangPassword());
   };
   let handleShowListRecipe = () => {
      dispathRedux(acctionShowListRecipe());
   };
   let onhandleCreateRecipe = () => {
      dispathRedux(acctionCreateRecipe());
   };
   let onhandleRechargeMoney = () => {
      dispathRedux(acctionRechargeMoney());
   };
   let onhandleWithdrawMoney = () => {
      dispathRedux(acctionWithdrawMoney());
   };
   let handleShowTransactionHistory = () => {
      dispathRedux(acctionShowTransactionHistory());
   };
   let handleShowUserRecipeDetail = () => {
      dispathRedux(acctionShowUserRecipeDetail());
   };

   return (
      <Container>
         <div>
            {/* <dataContext.Provider value={handleShowUserRecipeDetail}> */}
            <UserProfile
               handleShowUserInfor={handleShowUserInfor}
               onhandleChangPassword={onhandleChangPassword}
               handleShowListRecipe={handleShowListRecipe}
               onhandleCreateRecipe={onhandleCreateRecipe}
               onhandleRechargeMoney={onhandleRechargeMoney}
               onhandleWithdrawMoney={onhandleWithdrawMoney}
               handleShowTransactionHistory={handleShowTransactionHistory}
               handleShowUserRecipeDetail={handleShowUserRecipeDetail}
            />
            {/* </dataContext.Provider> */}
         </div>
      </Container>
   );
}

export { ProfileContainer };
