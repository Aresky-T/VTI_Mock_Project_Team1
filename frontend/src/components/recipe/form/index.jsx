import React from "react";
import { MdAdd } from "react-icons/md";
import ImageUpload from "../../form/ImageUpload";
import RecipeIngredientFormContainer from "../../../Container/recipe/form/ingredient";
import RecipeStepFormContainer from "../../../Container/recipe/form/step";

const RecipeForm = ({
  name,
  description,
  note,
  point,
  ingredients,
  steps,
  imageUrl,
  imageFile,
  handleChangeFile,
  handleChangeForm,
  handleAddNewIngredient,
  handleRemoveIngredient,
  handleUpdateIngredientList,
  handleAddNewStep,
  handleRemoveStep,
  handleUpdateStepList,
  handleSubmit,
  handleShowError,
}) => {
  return (
    <form
      className="recipe-form"
      encType="multipart/form-data"
      onSubmit={handleSubmit}
    >
      <ul>
        <li className="form-line">
          <div className="recipe-form--image-url">
            <ImageUpload
              url={imageUrl}
              file={imageFile}
              handleChangeFile={handleChangeFile}
              title1={"Share your recipe for every one!"}
              title2={"Upload image from your device!"}
            />
          </div>
        </li>
        <li className="form-line">
          {/* <label className="form-label">Name: </label> */}
          <div className="form-input">
            <input
              type="text"
              name="name"
              value={name}
              onChange={handleChangeForm}
              placeholder="Enter recipe name (required)"
            />
            {/* {handleShowError("name")} */}
          </div>
        </li>
        <li className="form-line">
          {/* <label className="form-label">Description: </label> */}
          <div className="form-input">
            <textarea
              className="form-textarea"
              placeholder="Enter description (required)"
              name="description"
              value={description}
              onChange={handleChangeForm}
              rows={10}
            ></textarea>
            {/* {handleShowError("description")} */}
          </div>
        </li>
        <li className="form-line">
          {/* <label className="form-label">Note: </label> */}
          <div className="form-input">
            <textarea
              placeholder="Enter note"
              name="note"
              rows={7}
              value={note}
              onChange={handleChangeForm}
            ></textarea>
            {handleShowError("note")}
          </div>
        </li>
        <li className="form-line">
          <label className="form-label">Points: </label>
          <div className="form-input">
            <input
              type="text"
              placeholder="Enter point | Ex: 100"
              name="point"
              value={point}
              onChange={handleChangeForm}
            />
            {handleShowError("point")}
          </div>
        </li>
        <li className="form-line">
          <label className="form-label">Ingredients:</label>
          <div className="form-input ingredients">
            {ingredients.map((ingredient, index) => (
              <RecipeIngredientFormContainer
                key={index}
                ingredient={ingredient}
                handleUpdateIngredientList={handleUpdateIngredientList}
                handleRemove={handleRemoveIngredient}
              />
            ))}
          </div>
          <button type="button" onClick={handleAddNewIngredient}>
            <span>
              <MdAdd />
            </span>
            <span>New ingredient</span>
          </button>
        </li>
        <li className="form-line">
          <label className="form-label processing">Steps:</label>
          <div className="form-input steps">
            {steps.map((step, index) => (
              <RecipeStepFormContainer
                step={step}
                key={index}
                handleUpdateStepList={handleUpdateStepList}
                handleRemoveStep={handleRemoveStep}
              />
            ))}
          </div>
          <button type="button" onClick={handleAddNewStep}>
            <span>
              <MdAdd />
            </span>
            <span>New step</span>
          </button>
        </li>
        <li className="form-line">
          <div className="submit-button">
            <input type="submit" value="Submit" />
          </div>
        </li>
      </ul>
    </form>
  );
};

export default RecipeForm;
