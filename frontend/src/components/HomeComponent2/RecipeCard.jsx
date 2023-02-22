import React from 'react'
import { Link } from 'react-router-dom';
import { chefImage } from '../../constant/Image';

const RecipeCard = ({ recipe }) => {
    return (
        <div className="recipe-card">
            <Link to={`recipe/${recipe.id}`} className='custom-image-card'
                style={{ display: "block" }}
            >
                <img src={recipe.imageUrl} alt="" />
                <div className='darken'></div>
            </Link>
            <div className="recipe-card-info">
                <img className="auther-img" src={recipe.creator.avatarUrl ? recipe.creator.avatarUrl : chefImage} alt="" />
                <p className="recipe-title">{recipe.name}</p>
                <p className="recipe-point">Point: {recipe.point}</p>
                <p className="recipe-desc">Author: {recipe.creator.fullName}</p>
                <Link className="view-btn" to={`recipe/${recipe.id}`}>VIEW RECIPE</Link>
            </div>
        </div>
    )
}

export default RecipeCard