import React from "react";
import ListRecipe from "./ListRecipe";
import Navbar from "./Navbar";

function HomeComponent(props) {
   return (
      <div>
         <Navbar />
         <br></br>
         <ListRecipe />
      </div>
   );
}

export default HomeComponent;
