import React from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

function CreateRecipe(props) {
   return (
      <div>
         <Form>
            <FormGroup>
               <Label for="exampleSelect">Recipe Name</Label>
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

            <Button> Create Recipe</Button>
         </Form>
      </div>
   );
}

export default CreateRecipe;
