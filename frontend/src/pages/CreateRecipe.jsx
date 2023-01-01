import React, { useState } from "react";
import { Row, Col, Button, Form, FormGroup, Input, Label } from "reactstrap";

function CreateRecipe(props) {
   let [RecipeName, setRecipeName] = useState("");
   let [VideoUrl, setVideoUrl] = useState("");
   let [Price, setPrice] = useState(0);
   let [Ingridient, setIngridient] = useState("");
   return (
      <div>
         <Form>
            <FormGroup>
               <Label for="exampleSelect">Recipe Name</Label>
               <Input
                  value={RecipeName}
                  onChange={(event) => {
                     setRecipeName(event.target.value);
                  }}
               ></Input>
            </FormGroup>

            <FormGroup>
               <Label for="exampleText">Ingridient</Label>
               <Input id="exampleText" name="text" type="textarea" />
            </FormGroup>
            <FormGroup>
               <Label for="exampleText">Ingridient</Label>
               <Input
                  value={Ingridient}
                  onChange={(event) => {
                     setIngridient(event.target.value);
                  }}
               ></Input>
            </FormGroup>

            <FormGroup>
               <Label for="exampleSelect">VedioURL</Label>
               <Input
                  value={VideoUrl}
                  onChange={(event) => {
                     setVideoUrl(event.target.value);
                  }}
               ></Input>
            </FormGroup>
            <FormGroup>
               <Label for="exampleSelect">Price</Label>
               <Row>
                  <Col md={8}>
                     <Input
                        value={Price}
                        onChange={(event) => {
                           setPrice(event.target.value);
                        }}
                     ></Input>
                  </Col>
                  <Col md={4}>
                     <h4>VNĐ</h4>
                  </Col>
               </Row>
            </FormGroup>
            <Row>
               <Col md={4}></Col>
               <Col md={4}>
                  <Button> Create Recipe</Button>
               </Col>
            </Row>
         </Form>
      </div>
   );
}

export default CreateRecipe;
