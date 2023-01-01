import React from "react";
import ResultFormItem from "./ResultFormItem";

function ListRecipe(props) {
   let { handleShowRecipeDetail } = props;
   return (
      <div id="paginationID">
         <ResultFormItem handleShowRecipeDetail={handleShowRecipeDetail} />
         <br></br>
      </div>
   );
}

export default ListRecipe;
