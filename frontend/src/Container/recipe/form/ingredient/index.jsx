import React, { useCallback, useEffect, useReducer, useState } from "react";
import ingredientFormReducer, {
  initIngredientForm,
  onUpdateMultipleIngredientFields,
} from "./reducer";
import RecipeIngredientForm from "../../../../components/recipe/form/ingredient";
import useDebounce from "../../../../hook/debounce";
import ValidateUtils from "../../../../utils/validate2";

const RecipeIngredientFormContainer = ({
  ingredient,
  handleUpdateIngredientList,
  handleRemove,
}) => {
  const [formState, dispatch] = useReducer(
    ingredientFormReducer,
    initIngredientForm
  );
  const [isValid, setIsValid] = useState(false);
  const [errors, setErrors] = useState(new Map());
  const [isChanging, setIsChanging] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const ingredientNumber = ingredient.ingredientNumber;

  const debouncedFormState = useDebounce(formState, 1000);

  const handleChangeForm = (event) => {
    if (!isChanging) setIsChanging(true);
    const { name, value } = event.target;
    const formData = {
      [name]: value,
      isNew: false,
      isSaved: false,
    };
    onUpdateMultipleIngredientFields(formData, dispatch);
  };

  const handleValidateForm = useCallback(() => {
    if (formState.isNew || formState.isSaved) return;
    const validator = new ValidateUtils({
      name: formState.name,
      amount: formState.amount,
      unit: formState.unit,
    });

    validator.required("name");
    validator.notEmpty("name");

    validator.required("amount");
    // validator.digits("amount");
    validator.greaterThan("amount", 0);

    validator.required("unit");
    validator.notEmpty("unit");

    const { isValid, errors } = validator.validate();
    setIsValid(isValid);
    setErrors(errors);
  }, [formState]);

  const handleSaveIngredient = useCallback(() => {
    const { name, amount, unit } = debouncedFormState;
    const formData = {
      name,
      amount,
      unit,
      isValid,
      errors,
    };
    handleUpdateIngredientList(ingredientNumber, formData);
  }, [
    ingredientNumber,
    isValid,
    errors,
    debouncedFormState,
    handleUpdateIngredientList,
  ]);

  useEffect(() => {
    if (formState === debouncedFormState) setIsChanging(false);
  }, [formState, debouncedFormState]);

  useEffect(() => {
    handleValidateForm();
  }, [handleValidateForm]);

  useEffect(() => {
    if (isChanging || formState.isNew || formState.isSaved) return;
    setIsSaving(true);
  }, [isChanging, formState.isNew, formState.isSaved]);

  useEffect(() => {
    if (isSaving) {
      const timeout = setTimeout(() => {
        handleSaveIngredient();
        setIsSaving(false);
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [isSaving, handleSaveIngredient]);

  useEffect(() => {
    if (ingredient) {
      onUpdateMultipleIngredientFields(ingredient, dispatch);
    }
  }, [ingredient]);

  return (
    <RecipeIngredientForm
      ingredientNumber={ingredientNumber}
      name={formState.name}
      amount={formState.amount}
      unit={formState.unit}
      isValid={formState.isValid}
      isNew={formState.isNew}
      errors={formState.errors}
      isSaving={isSaving}
      isSaved={formState.isSaved}
      isChanging={isChanging}
      handleChange={handleChangeForm}
      handleRemove={() => handleRemove(ingredientNumber)}
    />
  );
};

export default RecipeIngredientFormContainer;
