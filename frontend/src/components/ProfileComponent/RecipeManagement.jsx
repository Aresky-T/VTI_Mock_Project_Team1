import React from 'react'
import {useSelector} from 'react-redux';

const RecipeManagement = () => {
  const profile = useSelector(state => state.user.user.data);
  return (
    <div className='profile-body'>RecipeManagement</div>
  )
}

export default RecipeManagement