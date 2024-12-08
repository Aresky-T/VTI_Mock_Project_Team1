import React from "react";
import ImageUpload from "../../../form/ImageUpload";
import { MdDelete } from "react-icons/md";

const RecipeStepForm = ({
  stepNumber,
  name,
  description,
  duration,
  imageUrl,
  imageFile,
  isNew,
  isValid,
  isChanging,
  isSaving,
  isSaved,
  errors,
  handleChangeForm,
  handleRemove,
}) => {
  return (
    <div className="recipe-step-form">
      <div className="recipe-step-form__number">
        <span>{stepNumber}</span>
      </div>
      <div className="recipe-step-form__main">
        <div className="recipe-step-form__inputs">
          <input
            type="text"
            name="name"
            placeholder="Enter step name"
            value={name}
            onChange={handleChangeForm}
          />
          <textarea
            placeholder={`Enter description for step ${stepNumber}`}
            name="description"
            value={description}
            rows={10}
            onChange={handleChangeForm}
          />
          <input
            type="text"
            name="duration"
            placeholder="Enter step duration"
            value={duration}
            onChange={handleChangeForm}
          />
          <ImageUpload
            url={imageUrl}
            file={imageFile}
            handleChangeFile={(file) => {
              handleChangeForm({
                target: {
                  name: "imageFile",
                  value: file,
                },
              });
              handleChangeForm({
                target: {
                  name: "imageUrl",
                  value: null,
                },
              });
            }}
          />
        </div>
        <div className="recipe-step-form__status">
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
      <div className="recipe-step-form__options">
        <div className="recipe-step-form__options--remove">
          <button
            type="button"
            title="Remove step"
            onClick={() => handleRemove(stepNumber)}
          >
            <MdDelete />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeStepForm;
