import React from "react";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";

function ChangePassword(props) {
   return (
      <div>
         <Form>
            <FormGroup>
               <Label for="exampleUsername">Old password</Label>
               <Row>
                  <Col md={11}>
                     <Input id="examplePassword" name="password" type="password"></Input>
                  </Col>
                  <Col md={1}>
                     <Button>
                        <i className="glyphicon glyphicon-eye"></i>
                     </Button>
                  </Col>
               </Row>
            </FormGroup>

            <FormGroup>
               <Label for="exampleEmail">New password</Label>
               <Row>
                  <Col md={11}>
                     <Input id="examplePassword" name="password" type="password"></Input>
                  </Col>
                  <Col md={1}>
                     <Button>
                        <i className="glyphicon glyphicon-filter"></i>
                     </Button>
                  </Col>
               </Row>
            </FormGroup>

            <FormGroup>
               <Label for="examplePassword">Confirm Password</Label>
               <Row>
                  <Col md={11}>
                     <Input id="examplePassword" name="password" type="password"></Input>
                  </Col>
                  <Col md={1}>
                     <Button>
                        <i className="glyphicon glyphicon-user"></i>
                        <i className="glyphicon glyphicon-eye"></i>
                     </Button>
                  </Col>
               </Row>
            </FormGroup>
            <Row>
               <Col md={4}></Col>
               <Col md={4}>
                  <Button>ChangePassword</Button>
               </Col>
               <Col md={4}></Col>
            </Row>
         </Form>
      </div>
   );
}

export default ChangePassword;
