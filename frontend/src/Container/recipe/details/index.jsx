import React, { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  checkRecipeExistsApi,
  getRecipeDetailsApi,
  getRecipeDetailsForOwnerApi,
} from "../../../api/recipe.api";
import RecipeDetails from "../../../components/recipe/details";
import useLoadingIndicator from "../../../components/loading/indicator";
import { useAuth } from "../../../redux/selector";
import useLoginModal from "../../../components/auth/ModalLogin";
import VotingContainer from "./voting";
import RecipePurchaseContainer from "./purchase";
import { toast } from "react-toastify";
import RecipeCommentContainer from "./comment";
import SubmitButton from "../../../components/styled/button/submit";
import ROUTES from "../../../constant/routes";
import { checkRecipeOwnershipApi } from "../../../api/recipe.owner.api";

const RecipeDetailsContainer = () => {
  const [recipeId, setRecipeId] = useState(null);
  const [recipe, setRecipe] = useState(null);
  const [ownership, setOwnership] = useState({
    isOwner: false,
    isCreator: false,
    isChecked: false,
  });
  const [isExists, setIsExists] = useState(false);
  const loginModal = useLoginModal();
  const loginActions = loginModal.actions;
  const ModalLogin = loginModal.ModalLogin;

  const [params] = useSearchParams();
  const auth = useAuth();
  const currentUser = auth.signIn.currentUser;

  const navigate = useNavigate();

  const recipeDetailsRef = useRef(null);
  const firstLoading = useLoadingIndicator("Please wait a moment", {
    defaultActive: true,
    // duration: 1500,
  });

  const handleClickToScroll = () => {
    recipeDetailsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleCheckRecipeExists = useCallback(() => {
    if (!params.has("id") || recipeId || isExists) return;
    const id = Number(params.get("id"));
    if (isNaN(id)) return;

    firstLoading.onActive(4000);
    checkRecipeExistsApi(id)
      .then((res) => {
        if (res.data) {
          setIsExists(true);
          setRecipeId(id);
        } else {
          setIsExists(false);
          firstLoading.onClose();
        }
      })
      .catch((err) => {});
    //eslint-disable-next-line
  }, [params]);

  const handleGetRecipeDetails = useCallback(async () => {
    if (!recipeId) return;
    try {
      let response1;

      if (!currentUser) {
        response1 = await getRecipeDetailsApi(recipeId);
      } else {
        const accessToken = currentUser.token;
        const response2 = await checkRecipeOwnershipApi(recipeId, accessToken);
        setOwnership({
          isOwner: response2.data.isOwner,
          isCreator: response2.data.isCreator,
          isChecked: true,
        });
        if (response2.data.isOwner) {
          response1 = await getRecipeDetailsForOwnerApi(recipeId, accessToken);
        } else {
          response1 = await getRecipeDetailsApi(recipeId);
        }
      }

      setRecipe(response1.data);
    } catch (error) {
    } finally {
      setTimeout(() => {
        firstLoading.onClose();
      }, 500);
    }
    //eslint-disable-next-line
  }, [recipeId, currentUser]);

  useEffect(() => {
    if (firstLoading.active || !ownership.isChecked || !ownership.isOwner)
      return;
    toast.success(
      ownership.isCreator
        ? "You are this recipe author!"
        : "You already owned this recipe!"
    );
  }, [
    ownership.isChecked,
    ownership.isOwner,
    ownership.isCreator,
    firstLoading.active,
  ]);

  useEffect(() => {
    handleGetRecipeDetails();
  }, [handleGetRecipeDetails]);

  useEffect(() => {
    handleCheckRecipeExists();
  }, [handleCheckRecipeExists]);

  return (
    <div className="recipe-detail-container" ref={recipeDetailsRef}>
      {firstLoading.active ? (
        <firstLoading.LoadingIndicator />
      ) : (
        <>
          {recipe ? (
            <>
              <RecipeDetails
                recipe={recipe}
                handleClickToScroll={handleClickToScroll}
              />
              {ownership.isCreator && (
                <SubmitButton
                  className={"recipe-detail-edit-button"}
                  active={true}
                  value="EDIT RECIPE"
                  onSubmit={() =>
                    navigate(ROUTES.RECIPE_EDIT.concat("?id=").concat(recipeId))
                  }
                />
              )}
              <RecipePurchaseContainer
                recipe={recipe}
                isOwner={ownership.isOwner}
                handleLogin={loginActions.onActive}
                handleRefetchRecipe={handleGetRecipeDetails}
              />
              <VotingContainer
                recipe={recipe}
                onShowLoginModal={loginActions.onActive}
              />
              <RecipeCommentContainer
                recipe={recipe}
                onShowLoginModal={loginActions.onActive}
                handleClickToScrollTop={handleClickToScroll}
              />
            </>
          ) : (
            <>
              <div className="not-found-recipe">
                <p>Not found recipe!</p>
              </div>
            </>
          )}
        </>
      )}
      <ModalLogin />
    </div>
  );
};

export default RecipeDetailsContainer;
