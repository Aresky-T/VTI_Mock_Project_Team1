import React, { forwardRef, useEffect, useState } from 'react'
import { getAllRecipes } from '../../api/recipe.api';
import PreviousSearch from './PreviousSearch'
import RecipeCard from './RecipeCard';

const HomeBody = (props, ref) => {

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');

  function getAllRecipesForShow() {
    getAllRecipes(search)
      .then(res => {
        // console.log(res.data.content);
        setRecipes(res.data.content);
      })
      .catch()
  }

  // console.log("search", search)

  useEffect(() => {
    getAllRecipesForShow();
  }, [search])

  return (
    <div ref={ref} style={{ paddingTop: '60px' }}>
      <PreviousSearch search={search} setSearch={setSearch} />
      <div className="recipes-container">
        {/* <RecipeCard /> */}
        {recipes.map((recipe, index) => (
          <RecipeCard key={index} recipe={recipe} />
        ))}
      </div>
      {recipes.length === 0 && (
        <div className='no-recipe'>There are no recipes named "{search}"</div>
      )}
      <div className="show-more">
        <button className="btn-show-more">
          Show more
        </button>
      </div>
    </div>
  )
}

export default forwardRef(HomeBody);
