import React from "react";
import { Col, Row } from "reactstrap";
import RightProfile from "../UserProfileComponent/RightProfile";
function UserProfile(props) {
   let {
      handleShowUserInfor,
      onhandleChangPassword,
      handleShowListRecipe,
      onhandleCreateRecipe,
      onhandleRechargeMoney,
      onhandleWithdrawMoney,
      handleShowTransactionHistory,
      handleShowUserRecipeDetail,
   } = props;
   return (
      <div>
         <Row>
            <Col md={3}>
               <div>
                  <ul>
                     <li>
                        <button type="button" className="btn btn-warning" onClick={handleShowUserInfor}>
                           User Infor
                        </button>
                     </li>
                     <li>
                        <button type="button" className="btn btn-warning" onClick={onhandleChangPassword}>
                           Change password
                        </button>
                     </li>
                     <li>
                        <button type="button" className="btn btn-warning" onClick={onhandleCreateRecipe}>
                           Create Recipe
                        </button>
                     </li>
                     <li>
                        <button type="button" className="btn btn-warning" onClick={handleShowListRecipe}>
                           View my list recipe
                        </button>
                     </li>
                     <li>
                        <button type="button" className="btn btn-warning" onClick={onhandleRechargeMoney}>
                           Recharge Money
                        </button>
                     </li>
                     <li>
                        <button type="button" className="btn btn-warning" onClick={onhandleWithdrawMoney}>
                           Withdraw Money
                        </button>
                     </li>
                     <li>
                        <button type="button" className="btn btn-warning" onClick={handleShowTransactionHistory}>
                           Transaction History
                        </button>
                     </li>
                  </ul>
               </div>
            </Col>
            <Col md={9}>
               <RightProfile handleShowUserRecipeDetail={handleShowUserRecipeDetail} />
            </Col>
         </Row>
      </div>
   );
}

export default UserProfile;
