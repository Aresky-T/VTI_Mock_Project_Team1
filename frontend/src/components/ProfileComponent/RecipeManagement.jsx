import React from "react";
import { useSelector } from "react-redux";
import CustomPaginationActionsTable from "./MaterialUITable";
import RecipeDeleteModal from "./RecipeDeleteModal";

const RecipeManagement = () => {
  const isShowForDelete = useSelector(
    (state) => state.recipes.recipe.isShowPopupDelete
  );

  return (
    <div className="profile-body recipes-management">
      <div className="profile-body_header">
        <h3>Your created recipes</h3>
      </div>
      <CustomPaginationActionsTable />
      {isShowForDelete && <RecipeDeleteModal />}
    </div>
  );
};

export default RecipeManagement;
