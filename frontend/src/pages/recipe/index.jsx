import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import RecipeFormContainer from "../../Container/recipe/form";

const RecipePage = () => {
  const [id, setId] = useState(null);
  const [params] = useSearchParams();

  useEffect(() => {
    if (params.has("id") && !isNaN(Number(params.get("id")))) {
      setId(Number(params.get("id")));
    }
  }, [params]);

  return (
    <div className="container recipe-page">
      <RecipeFormContainer recipeId={id} />
    </div>
  );
};

export default RecipePage;
