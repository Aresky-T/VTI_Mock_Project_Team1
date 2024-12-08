import React from "react";
import { MdDelete } from "react-icons/md";

const RecipeIngredientForm = ({
  ingredientNumber,
  name,
  amount,
  unit,
  errors,
  isValid,
  isNew,
  isChanging,
  isSaving,
  isSaved,
  handleChange,
  handleRemove,
}) => {
  return (
    <div className="recipe-ingredient-form">
      <div className="recipe-ingredient-form__number">
        <span>{ingredientNumber}</span>
      </div>
      <div className="recipe-ingredient-form__main">
        <div className="recipe-ingredient-form__inputs">
          <input
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
            placeholder="Name | Ex: sugar"
          />
          <input
            type="text"
            name="amount"
            value={Number(amount) > 0 ? Number(amount) : 0}
            onChange={handleChange}
            placeholder="Amount | Ex: 200"
          />
          <input
            type="text"
            name="unit"
            value={unit}
            onChange={handleChange}
            placeholder="Unit | Ex: gram"
          />
          <div className="recipe-ingredient-form_item--icons">
            <button type="button" onClick={handleRemove}>
              <MdDelete id="btn-ingredient-remove" />
            </button>
          </div>
        </div>
        <div className="recipe-ingredient-form__status">
          {isNew ? (
            <div className="col-green">
              <span>New</span>
            </div>
          ) : (
            <div className="col-gray">
              {isChanging ? (
                <span>Changing...</span>
              ) : (
                <>
                  {isSaving ? (
                    <span>Saving...</span>
                  ) : (
                    <>
                      {isSaved && <span className="col-gray">Saved | </span>}
                      {isValid ? (
                        <span className="col-green">Valid</span>
                      ) : (
                        <span className="col-red">Invalid</span>
                      )}
                    </>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeIngredientForm;
