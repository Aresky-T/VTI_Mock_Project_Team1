import React from "react";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";

function UserRecipeDetail(props) {
   return (
      <div>
         <Form>
            <h3>Recipes Detail</h3>

            <FormGroup>
               <Row>
                  <Col md={2}>
                     <Label for="exampleSelect">Recipe Name</Label>
                  </Col>
                  <Col md={6}></Col>
                  <Col md={2}>
                     <Button> Edit</Button>
                  </Col>
                  <Col md={2}>
                     <Button> Save</Button>
                  </Col>
               </Row>
               <Input></Input>
            </FormGroup>

            <FormGroup>
               <Label for="exampleText">Ingridient</Label>
               <Input id="exampleText" name="text" type="textarea" />
            </FormGroup>
            <FormGroup>
               <Label for="exampleSelect">VedioURL</Label>
               <Input></Input>
            </FormGroup>
            <FormGroup>
               <Label for="exampleSelect">Price</Label>
               <Input></Input>
            </FormGroup>
         </Form>
      </div>
   );
}

export default UserRecipeDetail;
