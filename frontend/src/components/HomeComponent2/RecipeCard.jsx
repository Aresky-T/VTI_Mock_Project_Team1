import React from "react";
import { Link } from "react-router-dom";
import { chefImage } from "../../constant/Image";
import ROUTES from "../../constant/routes";

const RecipeCard = ({ recipe }) => {
  return (
    <div className="recipe-card">
      <Link
        to={`${ROUTES.RECIPE_DETAILS}?id=${recipe.id}`}
        className="custom-image-card"
        style={{ display: "block" }}
      >
        <img src={recipe.imageUrl} alt="" loading="lazy" />
        <div className="darken"></div>
      </Link>
      <div className="recipe-card-info">
        <img
          className="author-img"
          src={recipe.creator.avatarUrl ? recipe.creator.avatarUrl : chefImage}
          alt=""
          loading="lazy"
        />
        <p className="recipe-title">{recipe.name}</p>
        <p className="recipe-point">Point: {recipe.point}</p>
        <p className="recipe-desc">Author: {recipe.creator.fullName}</p>
        <Link
          className="view-btn"
          to={`${ROUTES.RECIPE_DETAILS}?id=${recipe.id}`}
        >
          VIEW RECIPE
        </Link>
      </div>
    </div>
  );
};

export default RecipeCard;
