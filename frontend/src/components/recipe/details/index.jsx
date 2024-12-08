import React, { useMemo } from "react";
import { chefMan, chefWoman } from "../../../constant/Image";

const RecipeDetails = ({ recipe }) => {
  const renderIngredients = useMemo(
    () =>
      recipe?.ingredients && (
        <>
          <h3 className="h3-title">
            Ingredients - {recipe.ingredients.length}
          </h3>
          {recipe.ingredients.map((ingredient, index) => (
            <p className="p-content-detail" key={index}>
              → {ingredient.amount} {ingredient.unit} {ingredient.name}
            </p>
          ))}
        </>
      ),
    [recipe]
  );

  const renderSteps = useMemo(() => {
    if (!recipe?.steps || !recipe.steps.length) return;

    return (
      <>
        <h3 className="h3-title">Steps - {recipe.steps.length} </h3>
        {recipe.steps.map((step, index) => (
          <div className="steps-item" key={index}>
            <h4 className="steps-item__title">
              🧑‍🍳{" "}
              <span className="h4-title">
                Step {step.stepNumber}: {step.name}
              </span>
            </h4>
            <div className="steps-item__information">
              <p className="p-content-detail">
                🕑 Duration:{" "}
                <span>
                  <b>{step.duration}</b>
                </span>
              </p>
              <p className="p-content-detail">🗒️ {step.description}</p>
              {step.imageUrl && (
                <div className="steps-item__image">
                  <img src={step.imageUrl} alt="" loading="lazy" />
                </div>
              )}
            </div>
          </div>
        ))}
      </>
    );
  }, [recipe]);

  return (
    <>
      <div className="information">
        <div className="recipe-info">
          <p className="recipe-name">{recipe.name}</p>
        </div>
        <div className="author">
          <div className="author-avatar">
            {recipe.creator.avatarUrl ? (
              <>
                <img src={recipe.creator.avatarUrl} alt="" loading="lazy" />
              </>
            ) : (
              <>
                <img
                  src={recipe.creator.gender === "MALE" ? chefMan : chefWoman}
                  alt=""
                  loading="lazy"
                />
              </>
            )}
          </div>
          <p className="recipe-create-date">
            Date: {new Date(recipe.createDate).toLocaleDateString()}
          </p>
          <p className="author-name">Author: {recipe.creator.fullName}</p>
        </div>
        <div className="horizontal-line">
          ༺・~・~・~・ღℛℯ☪¡℘ℯ ꜰℴℴðღ・~・~・~・༻
        </div>
        <div className="recipe-image">
          <img src={recipe.imageUrl} alt="" loading="lazy" />
        </div>
        <div className="horizontal-line">
          ༺・~・~・~・ღℛℯ☪¡℘ℯ ꜰℴℴðღ・~・~・~・༻
        </div>
      </div>
      <div className="recipe-detail">
        <div className="description">
          <h3 className="h3-title">Description</h3>
          <p className="p-content-detail">{recipe.description}</p>
        </div>
        <div className="ingredients">{renderIngredients}</div>
        <div className="steps">{renderSteps}</div>
        <div className="recipe-note">
          {recipe.note && (
            <>
              <h3 className="h3-title">Note</h3>
              <p className="p-content-detail">{recipe.note}</p>
            </>
          )}
        </div>
        <div className="point">
          <h3 className="h3-title">
            Point: <span>{recipe.point}</span>
          </h3>
        </div>
      </div>
    </>
  );
};

export default RecipeDetails;
