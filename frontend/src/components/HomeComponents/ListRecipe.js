import React from "react";
import { Button, Col, Row } from "reactstrap";
import ResultFormItem from "./ResultFormItem";

function ListRecipe(props) {
   return (
      <div id="paginationID">
         <Row>
            <ResultFormItem />
         </Row>
         <br></br>
      </div>
   );
}

export default ListRecipe;
