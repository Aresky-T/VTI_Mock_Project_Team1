import React from 'react'
import { useSelector } from 'react-redux'

const CreateRecipe = () => {
  const currentUser = useSelector(state => state.auth.signIn.currentUser);

  console.log(currentUser);
  
  return (
    <div>CreateRecipe</div>
  )
}

export default CreateRecipe