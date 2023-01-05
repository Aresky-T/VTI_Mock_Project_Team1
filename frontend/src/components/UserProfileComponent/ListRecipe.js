import React from "react";
import { Button, Table } from "reactstrap";

function ListRecipe(props) {
   let { handleShowUserRecipeDetail } = props;
   let showDetail = () => {
      handleShowUserRecipeDetail();
   };
   return (
      <div>
         <h3>My list Recipes</h3>
         <Table responsive>
            <thead>
               <tr>
                  <th>STT</th>
                  <th>RecipeName</th>
                  <th>Image</th>
                  <th>Create Date</th>
                  <th>Vote</th>
               </tr>
            </thead>
            <tbody>
               <tr>
                  <th scope="row">1</th>
                  <td>
                     <Button onClick={showDetail}>Recipe 1</Button>
                  </td>
                  <td>Hinh anh 1 </td>
                  <td>2022/12/20 </td>
                  <td>5* </td>
               </tr>
               <tr>
                  <th scope="row">2</th>
                  <td>
                     <Button onClick={showDetail}>Recipe 2</Button>
                  </td>
                  <td>Hinh anh 2 </td>
                  <td>2022/12/20 </td>
                  <td>5* </td>
               </tr>
               <tr>
                  <th scope="row">3</th>
                  <td>
                     <Button onClick={showDetail}>Recipe 3</Button>
                  </td>
                  <td>Hinh anh 3 </td>
                  <td>2022/12/20 </td>
                  <td>5* </td>
               </tr>
            </tbody>
         </Table>
      </div>
   );
}

export default ListRecipe;
