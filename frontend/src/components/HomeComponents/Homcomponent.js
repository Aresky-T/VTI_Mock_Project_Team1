import React from "react";
import ListRecipe from "./ListRecipe";
import Narbar from "./Narbar";

function Homcomponent(props) {
   return (
      <div>
         <Narbar />
         <br></br>
         <ListRecipe />
      </div>
   );
}

export default Homcomponent;
