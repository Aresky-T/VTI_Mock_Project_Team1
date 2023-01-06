import React from "react";
import { useSelector } from "react-redux";
import { Button, Col } from "reactstrap";

function ResultFormItem(props) {
   let { handleShowRecipeDetail } = props;
   let listRecipesredux = useSelector((state) => state.homeRedux.listRecipes);
   console.log("listRecipesredux:", listRecipesredux);
   let showDetail = (recipe) => {
      handleShowRecipeDetail(recipe);
   };
   // Tạo listRecipe giả lập
   let ingridient1 = { id: 1, ingridient: "500 gam sườn non" };
   let ingridient2 = { id: 2, ingridient: "3 củ hành" };
   let ingridient3 = { id: 3, ingridient: "1 củ tỏi" };
   let ingridient4 = { id: 4, ingridient: "3 thìa giấm" };
   let ingridient5 = { id: 5, ingridient: "Bột canh, đường, nước mắm, dầu ăn, tương ớt, hạt tiêu,... " };
   let listIngridients = [ingridient1, ingridient2, ingridient3, ingridient4, ingridient5];
   let ingridientItem = "";
   ingridientItem = listIngridients.map((ingridient, index) => {
      return (
         <p key={index}>
            {index + 1}: {ingridient.ingridient}
         </p>
      );
   });
   console.log("ingridientItem", ingridientItem);
   let recipe1 = {
      id: 1,
      recipeName: "RecipeName1",
      ingridient: ingridientItem,
      imageUrl: <iframe src="https://drive.google.com/file/d/1hRfNlSyg9i9wYbAfmRIGqejX65eZwaKu/preview" width="160" height="80" title="1"></iframe>,
      videoUrl: (
         <iframe src="https://drive.google.com/file/d/1bgbgFaph2T3WbdrqgJSTH1ne59f9w_Uh/preview" width="800" height="240" allow="autoplay" title="1"></iframe>
      ),
      Createby: "Username1",
      vote: "5*",
      price: 0,
   };
   let recipe2 = {
      id: 2,
      recipeName: "RecipeName2",
      ingridient: ingridientItem,
      imageUrl: (
         <iframe src="https://drive.google.com/file/d/1w7N7yBoh58YNRlL9nUIkJ8K_utCTT9Ar/preview" width="160" height="80" allow="autoplay" title="1"></iframe>
      ),
      videoUrl: "",
      Createby: "Username2",
      vote: "5*",
      price: 300000,
   };
   let recipe3 = {
      id: 3,
      recipeName: "RecipeName3",
      ingridient: ingridientItem,
      imageUrl: (
         <iframe src="https://drive.google.com/file/d/1w7N7yBoh58YNRlL9nUIkJ8K_utCTT9Ar/preview" width="160" height="80" allow="autoplay" title="1"></iframe>
      ),
      videoUrl: (
         <iframe src="https://drive.google.com/file/d/1bgbgFaph2T3WbdrqgJSTH1ne59f9w_Uh/preview" width="800" height="240" allow="autoplay" title="1"></iframe>
      ),
      Createby: "Username3",
      vote: "5*",
      price: 300000,
   };
   let recipe4 = {
      id: 3,
      recipeName: "RecipeName3",
      ingridient: ingridientItem,
      imageUrl: (
         <iframe src="https://drive.google.com/file/d/1w7N7yBoh58YNRlL9nUIkJ8K_utCTT9Ar/preview" width="160" height="80" allow="autoplay" title="1"></iframe>
      ),
      videoUrl: (
         <iframe src="https://drive.google.com/file/d/1bgbgFaph2T3WbdrqgJSTH1ne59f9w_Uh/preview" width="800" height="240" allow="autoplay" title="1"></iframe>
      ),
      Createby: "Username3",
      vote: "5*",
      price: 300000,
   };
   let recipe5 = {
      id: 3,
      recipeName: "RecipeName3",
      ingridient: ingridientItem,
      imageUrl: (
         <iframe src="https://drive.google.com/file/d/1w7N7yBoh58YNRlL9nUIkJ8K_utCTT9Ar/preview" width="160" height="80" allow="autoplay" title="1"></iframe>
      ),
      videoUrl: (
         <iframe src="https://drive.google.com/file/d/1bgbgFaph2T3WbdrqgJSTH1ne59f9w_Uh/preview" width="800" height="240" allow="autoplay" title="1"></iframe>
      ),
      Createby: "Username3",
      vote: "5*",
      price: 300000,
   };

   listRecipesredux = [recipe1, recipe2, recipe3, recipe4, recipe5];

   let items = "";
   items = listRecipesredux.map((recipe, index) => {
      return (
         <Col md={4} key={index}>
            <Button onClick={() => showDetail(recipe)}>
               {recipe.imageUrl}
               <h4>{recipe.recipeName}</h4>
               Createby: {recipe.Createby}
               <br></br>
               {recipe.vote}
            </Button>
            <br></br>
            {recipe.price}VNĐ
         </Col>
      );
   });
   return items;
}

export default ResultFormItem;
