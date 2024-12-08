import React, { useCallback, useEffect, useRef, useState } from "react";
import { RiErrorWarningFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import lodash from "lodash";
import { useAuth } from "../../../redux/selector";
import useLoginModal from "../../../components/auth/ModalLogin";
import ROUTES from "../../../constant/routes";
import ValidateUtils from "../../../utils/validate2";
import {
  createRecipeApi,
  getRecipeDetailsForCreatorApi,
  updateRecipeApi,
} from "../../../api/recipe.api";
import ConfirmUpdateModal from "../../../components/recipe/update/ConfirmUpdateModal";
import ConfirmCreateModal from "../../../components/recipe/create/ConfirmCreateModal";
import { initIngredientForm } from "./ingredient/reducer";
import { initStepForm } from "./step/reducer";
import { toast } from "react-toastify";
import RecipeForm from "../../../components/recipe/form";

const RecipeFormContainer = ({ recipeId }) => {
  const timeoutIds = useRef([]);
  const auth = useAuth();
  const currentUser = auth.signIn.currentUser;
  const token = currentUser?.token;

  const [recipe, setRecipe] = useState(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [imageUrl, setImageUrl] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const [note, setNote] = useState("");
  const [point, setPoint] = useState(0);

  const [ingredients, setIngredients] = useState([
    lodash.cloneDeep(initIngredientForm),
  ]);
  const [steps, setSteps] = useState([lodash.cloneDeep(initStepForm)]);

  // Recipe form status state
  const [isNew, setIsNew] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const [errors, setErrors] = useState(new Map());

  // confirm modal state
  const [isShowConfirmCreate, setIsShowConfirmCreate] = useState(false);
  const [isShowConfirmUpdate, setIsShowConfirmUpdate] = useState(false);

  // For processing state
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  // for authentication
  const loginModal = useLoginModal(ROUTES.ROOT);
  const loginActions = loginModal.actions;
  const ModalLogin = loginModal.ModalLogin;
  const navigate = useNavigate();

  const handleChangeForm = (event) => {
    const { name, value } = event.target;
    setIsNew(false);
    switch (name) {
      case "name":
        setName(value);
        break;
      case "description":
        setDescription(value);
        break;
      case "imageFile":
        setImageFile(value);
        break;
      case "note":
        setNote(value);
        break;
      case "point":
        setPoint(Number(value) > 0 ? Number(value) : 0);
        break;
      default:
        break;
    }
  };

  const handleResetForm = () => {
    setName("");
    setDescription("");
    setImageUrl(null);
    setImageFile(null);
    setNote("");
    setPoint(0);
    setIngredients([lodash.cloneDeep(initIngredientForm)]);
    setSteps([lodash.cloneDeep(initStepForm)]);
  };

  const handleValidateForm = useCallback(() => {
    const formData = {
      name,
      description,
      imageFile,
      note,
      point,
      steps,
      ingredients,
    };

    const validator = new ValidateUtils(formData);
    validator.required("name");
    validator.notEmpty("name");

    validator.required("description");
    validator.notEmpty("description");

    if (!imageUrl) {
      validator.required("imageFile");
      validator.imageFile("imageFile");
    }

    validator.min("point", 0);

    validator.required("ingredients");
    validator.minLength("ingredients", 1);

    validator.allMatch(
      "ingredients",
      (item) => item.isValid,
      "All items in ingredient list must be valid!"
    );

    validator.required("steps");
    validator.minLength("steps", 1);
    validator.allMatch(
      "steps",
      (item) => item.isValid,
      "All items in step list must be valid!"
    );

    const { isValid, errors } = validator.validate();
    setIsValid(isValid);
    setErrors(errors);
  }, [name, description, imageUrl, imageFile, note, point, steps, ingredients]);

  const handleChangeFile = (file) => {
    setImageUrl(null);
    setImageFile(file);
  };

  const handleAddNewIngredient = () => {
    setIngredients((prevList) => {
      const newIngredient = lodash.cloneDeep(initIngredientForm);
      newIngredient.ingredientNumber = prevList.length + 1;
      return [...prevList, newIngredient];
    });
  };

  const handleResetIngredient = (ingredientNumber) => {
    setIngredients((prevList) =>
      prevList.map((item) => {
        if (item.ingredientNumber !== ingredientNumber) return item;
        delete item["errors"];
        return {
          ...item,
          name: "",
          amount: "",
          unit: "",
          isNew: true,
          isSaved: false,
          isValid: false,
        };
      })
    );
  };

  const handleRemoveIngredient = (ingredientNumber) => {
    if (ingredients.length === 1) {
      handleResetIngredient(ingredientNumber);
      return;
    }

    setIngredients((prevList) =>
      prevList
        .filter((item) => item.ingredientNumber !== ingredientNumber)
        .map((item) => {
          if (item.ingredientNumber > ingredientNumber) {
            item.ingredientNumber--;
          }
          return item;
        })
    );
  };

  const handleUpdateIngredientList = (ingredientNumber, formData) => {
    if (!ingredientNumber || ingredientNumber <= 0) return;

    setIngredients((prevList) =>
      prevList.map((item) => {
        if (item.ingredientNumber !== ingredientNumber) return item;
        return { ...item, ...formData, isNew: false, isSaved: true };
      })
    );
  };

  const handleAddNewStep = () => {
    setSteps((prevList) => {
      const newStep = lodash.cloneDeep(initStepForm);
      newStep.stepNumber = prevList.length + 1;
      return [...prevList, newStep];
    });
  };

  const handleResetStep = (stepNumber) => {
    setSteps((prevList) =>
      prevList.map((item) => {
        if (item.stepNumber !== stepNumber) return item;
        return {
          ...item,
          duration: "",
          description: "",
          name: "",
          imageUrl: null,
          imageFile: null,
          isNew: true,
          isValid: false,
        };
      })
    );
  };

  const handleRemoveStep = (stepNumber) => {
    if (steps.length === 1) {
      handleResetStep(stepNumber);
      return;
    }

    setSteps((prevList) =>
      prevList
        .filter((item) => item.stepNumber !== stepNumber)
        .map((item) => {
          if (item.stepNumber > stepNumber) {
            item.stepNumber--;
          }
          return item;
        })
    );
  };

  const handleUpdateStepList = (stepNumber, formData) => {
    if (!stepNumber || stepNumber <= 0) return;
    setSteps((prevList) =>
      prevList.map((item) => {
        if (item.stepNumber !== stepNumber) return item;
        return { ...item, ...formData, isNew: false, isSaved: true };
      })
    );
  };

  const handleCreateNewRecipe = () => {
    const formData = new FormData();
    formData.set("name", name);
    formData.set("description", description);
    formData.set("note", note);
    formData.set("point", point);
    if (imageFile) formData.set("imageFile", imageFile);

    steps.forEach((step, index) => {
      formData.append(`steps[${index}].stepNumber`, step.stepNumber);
      formData.append(`steps[${index}].name`, step.name);
      formData.append(`steps[${index}].description`, step.description);
      formData.append(`steps[${index}].duration`, step.duration);
      step.imageUrl &&
        formData.append(`steps[${index}].imageUrl`, step.imageUrl);
      step.imageFile &&
        formData.append(`steps[${index}].imageFile`, step.imageFile);
    });

    ingredients.forEach((ingredient, index) => {
      formData.append(`ingredients[${index}].name`, ingredient.name);
      formData.append(`ingredients[${index}].amount`, ingredient.amount);
      formData.append(`ingredients[${index}].unit`, ingredient.unit);
    });

    setIsCreating(true);
    const loading = toast.loading("Creating recipe, please wait a moment!");
    createRecipeApi(formData, token)
      .then((res) => {
        const successCreatedTimeout = setTimeout(() => {
          handleResetForm();
          setIsCreating(false);
          setIsShowConfirmCreate(false);
          toast.dismiss(loading);
          toast.success("Created Successfully!");
        }, 1000);

        timeoutIds.current.push(successCreatedTimeout);
      })
      .catch((err) => {
        setIsCreating(false);
        toast.dismiss(loading);
        toast.error("Create Failed!");
      });
  };

  const handleUpdateRecipe = () => {
    if (!recipeId) {
      toast.error("Not found identity of recipe!");
      return;
    }

    const formData = new FormData();
    formData.set("id", recipeId);
    formData.set("name", name);
    formData.set("description", description);
    formData.set("note", note);
    formData.set("point", point);
    if (imageFile) formData.set("imageFile", imageFile);

    steps.forEach((step, index) => {
      step.id && formData.append(`steps[${index}].id`, step.id);
      formData.append(`steps[${index}].stepNumber`, step.stepNumber);
      formData.append(`steps[${index}].name`, step.name);
      formData.append(`steps[${index}].description`, step.description);
      formData.append(`steps[${index}].duration`, step.duration);
      step.imageUrl &&
        formData.append(`steps[${index}].imageUrl`, step.imageUrl);
      step.imageFile &&
        formData.append(`steps[${index}].imageFile`, step.imageFile);
    });

    ingredients.forEach((ingredient, index) => {
      ingredient.id &&
        formData.append(`ingredients[${index}].id`, ingredient.id);
      formData.append(`ingredients[${index}].name`, ingredient.name);
      formData.append(`ingredients[${index}].amount`, ingredient.amount);
      formData.append(`ingredients[${index}].unit`, ingredient.unit);
    });

    setIsUpdating(true);
    const loading = toast.loading("Updating recipe, please wait a moment!");
    updateRecipeApi(formData, token)
      .then((res) => {
        setRecipe(res.data);
        const successUpdatedTimeout = setTimeout(() => {
          setIsUpdating(false);
          setIsShowConfirmUpdate(false);
          toast.dismiss(loading);
          toast.success("Updated successfully!");
        }, 1000);
        timeoutIds.current.push(successUpdatedTimeout);
      })
      .catch((err) => {
        setIsUpdating(false);
        toast.dismiss(loading);
        toast.error("Update Failed!");
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!isValid) {
      toast.error("Invalid form data, please check again!");
      return;
    }

    if (!recipeId) {
      setIsShowConfirmCreate(true);
    } else {
      setIsShowConfirmUpdate(true);
    }
  };

  const handleShowError = useCallback(
    (key) => {
      return (
        !isNew &&
        errors.has(key) && (
          <p className="warning">
            <RiErrorWarningFill />
          </p>
        )
      );
    },
    [errors, isNew]
  );

  useEffect(() => {
    handleValidateForm();
  }, [handleValidateForm]);

  useEffect(() => {
    if (recipe) {
      setName(recipe.name);
      setDescription(recipe.description);
      setImageFile(null);
      setImageUrl(recipe.imageUrl);
      setNote(recipe.note);
      setPoint(recipe.point);

      setSteps(
        recipe.steps.map((step, index) => ({
          ...step,
          imageFile: null,
          isSaved: true,
          isNew: false,
          isValid: true,
        }))
      );

      setIngredients(
        recipe.ingredients.map((ingredient, index) => ({
          ...ingredient,
          ingredientNumber: index + 1,
          isSaved: true,
          isNew: false,
          isValid: true,
        }))
      );
    }
  }, [recipe]);

  useEffect(() => {
    if (recipeId && token) {
      getRecipeDetailsForCreatorApi(recipeId, token)
        .then((res) => res.data)
        .then((recipe) => {
          setRecipe(recipe);
        })
        .catch((err) => {
          navigate(ROUTES.ROOT);
        });
    }
  }, [recipeId, token, navigate]);

  useEffect(() => {
    if (!currentUser) {
      loginActions.onActive();
    }
    //eslint-disable-next-line
  }, [currentUser]);

  useEffect(() => {
    function clearAllTimeouts() {
      timeoutIds.current.forEach((item) => clearTimeout(item));
      timeoutIds.current = [];
    }

    return () => clearAllTimeouts();
  }, []);

  return (
    <React.Fragment>
      <div className="recipe-form-container">
        <div className="recipe-form-title">
          <h2>🧑🏻‍🍳 {recipeId ? "Edit" : "Share"} your recipe 🍔</h2>
        </div>
        <RecipeForm
          name={name}
          description={description}
          imageFile={imageFile}
          imageUrl={imageUrl}
          note={note}
          point={point}
          ingredients={ingredients}
          steps={steps}
          handleAddNewIngredient={handleAddNewIngredient}
          handleRemoveIngredient={handleRemoveIngredient}
          handleUpdateIngredientList={handleUpdateIngredientList}
          handleAddNewStep={handleAddNewStep}
          handleRemoveStep={handleRemoveStep}
          handleUpdateStepList={handleUpdateStepList}
          handleChangeFile={handleChangeFile}
          handleChangeForm={handleChangeForm}
          handleShowError={handleShowError}
          handleSubmit={handleSubmit}
        />
        {!!recipeId ? (
          <ConfirmUpdateModal
            active={isShowConfirmUpdate}
            activeSubmitButton={!isUpdating && isValid}
            handleClose={() => setIsShowConfirmUpdate(false)}
            handleSubmit={handleUpdateRecipe}
          />
        ) : (
          <ConfirmCreateModal
            active={isShowConfirmCreate}
            activeSubmitButton={!isCreating && isValid}
            handleClose={() => setIsShowConfirmCreate(false)}
            handleSubmit={handleCreateNewRecipe}
          />
        )}
      </div>
      <ModalLogin />
    </React.Fragment>
  );
};

export default RecipeFormContainer;
