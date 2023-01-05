import React from "react";
import { Button, Col } from "reactstrap";
import Cachepomdua from "../../imgs/Cachepomdua.jpeg";

function ResultFormItem(props) {
   let recipe1 = { id: 1, recipeName: "RecipeName1", Createby: "Username1", vote: "5*", price: 300000 };
   let recipe2 = { id: 2, recipeName: "RecipeName2", Createby: "Username2", vote: "5*", price: 300000 };
   let recipe3 = { id: 3, recipeName: "RecipeName3", Createby: "Username3", vote: "5*", price: 300000 };
   let recipe4 = { id: 3, recipeName: "RecipeName3", Createby: "Username3", vote: "5*", price: 300000 };
   let recipe5 = { id: 3, recipeName: "RecipeName3", Createby: "Username3", vote: "5*", price: 300000 };

   let listRecipe = [recipe1, recipe2, recipe3, recipe4, recipe5];
   let items = "";
   items = listRecipe.map((recipe, index) => {
      return (
         <Col md={3}>
            <Button>
               <img src={Cachepomdua} alt="Không có ảnh" />
               <p>
                  <h4>{recipe.recipeName}</h4>
                  Createby: {recipe.Createby}
                  <br></br>
                  {recipe.vote} <br></br>Price: {recipe.price} VNĐ
               </p>
            </Button>
            <td>. </td>
         </Col>
      );
   });
   return items;
}

export default ResultFormItem;
