import React, { useCallback, useEffect, useReducer, useState } from "react";
import useDebounce from "../../../../hook/debounce";
import stepFormReducer, {
  initStepForm,
  onUpdateMultipleStepFields,
} from "./reducer";
import RecipeStepForm from "../../../../components/recipe/form/step";
import ValidateUtils from "../../../../utils/validate2";

const RecipeStepFormContainer = ({
  step,
  handleUpdateStepList,
  handleRemoveStep,
}) => {
  const [formState, dispatch] = useReducer(stepFormReducer, initStepForm);
  const debouncedFormState = useDebounce(formState, 1000);

  const [isValid, setIsValid] = useState(false);
  const [isChanging, setIsChanging] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState(new Map());

  const handleChangeForm = (event) => {
    if (!isChanging) setIsChanging(true);
    const { name, value } = event.target;
    const formData = {
      [name]: value,
      isNew: false,
      isSaved: false,
    };

    onUpdateMultipleStepFields(formData, dispatch);
  };

  const handleValidateForm = useCallback(() => {
    const validator = new ValidateUtils({
      name: formState.name,
      description: formState.description,
      duration: formState.duration,
      imageFile: formState.imageFile,
    });

    validator.required("name");
    validator.notEmpty("name");

    validator.required("description");
    validator.notEmpty("description");

    validator.required("duration");
    validator.notEmpty("duration");

    if (formState.imageFile) {
      validator.required("imageFile");
      validator.imageFile("imageFile");
    }

    const { isValid, errors } = validator.validate();
    setIsValid(isValid);
    setErrors(errors);
  }, [formState]);

  const handleSaveForm = useCallback(() => {
    const { stepNumber, name, description, duration, imageUrl, imageFile } =
      debouncedFormState;
    handleUpdateStepList(stepNumber, {
      name,
      description,
      duration,
      imageUrl,
      imageFile,
      isValid,
      errors,
    });
  }, [isValid, errors, debouncedFormState, handleUpdateStepList]);

  useEffect(() => {
    handleValidateForm();
  }, [handleValidateForm]);

  useEffect(() => {
    if (formState === debouncedFormState) setIsChanging(false);
  }, [formState, debouncedFormState]);

  useEffect(() => {
    if (isChanging || formState.isNew || formState.isSaved) return;
    setIsSaving(true);
    //eslint-disable-next-line
  }, [isChanging, formState]);

  useEffect(() => {
    if (isSaving) {
      const timeout = setTimeout(() => {
        handleSaveForm();
        setIsSaving(false);
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [isSaving, handleSaveForm]);

  useEffect(() => {
    if (step) {
      onUpdateMultipleStepFields({ ...step, isSaved: true }, dispatch);
    }
    //eslint-disable-next-line
  }, [step]);

  return (
    <RecipeStepForm
      name={formState.name}
      description={formState.description}
      duration={formState.duration}
      imageUrl={formState.imageUrl}
      imageFile={formState.imageFile}
      stepNumber={formState.stepNumber}
      isNew={formState.isNew}
      isValid={formState.isValid}
      isChanging={isChanging}
      isSaving={isSaving}
      isSaved={formState.isSaved}
      errors={errors}
      handleChangeForm={handleChangeForm}
      handleRemove={handleRemoveStep}
    />
  );
};

export default RecipeStepFormContainer;
