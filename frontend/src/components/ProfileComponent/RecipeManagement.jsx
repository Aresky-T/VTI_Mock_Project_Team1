import React from 'react'
import { useSelector } from 'react-redux';
import CustomPaginationActionsTable from './MaterialUITable';
import RecipeUpdateModal from './RecipeUpdateModal';
import RecipeDeleteModal from './RecipeDeleteModal';

const RecipeManagement = () => {

  const isShowForUpdate = useSelector(state => state.recipes.recipe.isShowPopupUpdate);
  const isShowForDelete = useSelector(state => state.recipes.recipe.isShowPopupDelete);

  return (
    <div className='profile-body recipes-management'>
      <div className="recipes-manage-top">
        <h3>Your recipes</h3>
      </div>
      <CustomPaginationActionsTable/>
      {isShowForUpdate && <RecipeUpdateModal/>}
      {isShowForDelete && <RecipeDeleteModal/>}
    </div>
  )
}

export default RecipeManagement