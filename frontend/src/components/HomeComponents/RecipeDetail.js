import React from "react";
import { useSelector } from "react-redux";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";

function RecipeDetail(props) {
   let { handleInputToCart, handleOnPayment, handleSubmitComment } = props;
   let recipeSate = useSelector((state) => state.homeRedux.recipeDetail);
   console.log("recipeSate", recipeSate);
   let inputToCart = (recipeParam) => {
      handleInputToCart(recipeParam);
   };
   let onpayment = (recipeParam) => {
      handleOnPayment(recipeParam);
   };
   let submitComment = () => {
      handleSubmitComment();
   };

   return (
      <div>
         <Form>
            <Button>Back</Button>
            <h3>Recipes Detail</h3>
            <FormGroup>
               <Row>
                  <Col md={2}>
                     <h4>{recipeSate.recipeName}</h4>
                  </Col>
                  <Col md={6}></Col>
                  <Col md={2}>
                     <Button onClick={() => inputToCart(recipeSate)}> Thêm vào giỏ</Button>
                  </Col>
                  <Col md={2}>
                     <Button onClick={() => onpayment(recipeSate)}> Thanh toán ngay</Button>
                  </Col>
               </Row>
            </FormGroup>

            <FormGroup>
               <h4>Ingridient</h4>
               {recipeSate.ingridient}
            </FormGroup>
            <FormGroup>
               <h4>Các bước thực hiện</h4>
               <Input id="exampleText" name="text" type="textarea" />
            </FormGroup>
            <FormGroup>
               <h4>Lưu ý</h4>
               <Input id="exampleText" name="text" type="textarea" />
            </FormGroup>
            <FormGroup>
               <Label for="exampleSelect">Video</Label>
               {recipeSate.videoUrl}
            </FormGroup>
            <Label for="exampleSelect">Price: {recipeSate.price} VNĐ</Label>

            <FormGroup>
               <Label for="exampleSelect">Vote</Label>
               <Row>
                  <Col md={2}>
                     <Input id="exampleSelect" name="select" type="select">
                        <option>5*</option>
                        <option>4*</option>
                        <option>3*</option>
                        <option>2*</option>
                        <option>1*</option>
                     </Input>
                  </Col>
               </Row>
            </FormGroup>
            <FormGroup>
               <Label for="exampleSelect">Comment</Label>
               <Row>
                  <Col md={11}>
                     <Input id="exampleText" name="text" type="textarea" />
                  </Col>
                  <Col md={1}>
                     <Button onClick={submitComment}>Submit</Button>
                  </Col>
               </Row>
            </FormGroup>
         </Form>
      </div>
   );
}

export default RecipeDetail;
