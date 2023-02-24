import React from 'react'
import { useSelector } from 'react-redux';
import CustomPaginationActionsTable from './MaterialUITable';
import RecipeUpdateModal from './RecipeUpdateModal';

const RecipeManagement = () => {

  const isShow = useSelector(state => state.recipes.recipe.isShowPopup)

  return (
    <div className='profile-body recipes-management'>
      <div className="recipes-manage-top">
        <h3>Your recipes</h3>
      </div>
      <CustomPaginationActionsTable/>
      {isShow && <RecipeUpdateModal/>}
    </div>
  )
}

export default RecipeManagement