import React, { useState } from "react";
import { Button, ButtonGroup, Col, FormGroup, Input, Row } from "reactstrap";

function Navbar(props) {
   let { handleSearch, handleShowCart, handleShowListRecipe } = props;
   let [NameParam, setNameParam] = useState("");
   let viewAll = () => {
      handleShowListRecipe();
   };
   let search = () => {
      console.log("nameParam", NameParam);
      handleSearch(NameParam);
   };
   let showCart = () => {
      handleShowCart();
   };
   return (
      <div>
         <Row>
            <Col md={3}>
               <FormGroup>
                  <Input
                     id="NameParam"
                     name="NameParam"
                     placeholder="Input key word"
                     type="text"
                     value={NameParam}
                     onChange={(event) => {
                        setNameParam(event.target.value);
                     }}
                  />
               </FormGroup>
            </Col>
            <Col md={1}>
               <Button onClick={search}>
                  <i className="glyphicon glyphicon-search"></i>
               </Button>
            </Col>
            <Col md={8}>
               <ButtonGroup>
                  <Button onClick={viewAll}>View All</Button>
                  <Button>Món Á</Button>
                  <Button>Món Âu</Button>
                  <Button>Free</Button>
                  <Button>New</Button>
                  <Button>Vote</Button>
                  <Button onClick={showCart}>
                     <i className="glyphicon glyphicon-shopping-cart"></i>
                  </Button>
               </ButtonGroup>
            </Col>
         </Row>
      </div>
   );
}

export default Navbar;
