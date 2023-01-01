import React from "react";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";

function UserInfor(props) {
   let tdStyle = {
      border: "1px solid black",
   };
   let password = 123456;
   return (
      <div>
         <Form>
            <FormGroup>
               <Label for="exampleUsername">Username</Label>
               <td width="1200" style={tdStyle}>
                  admin
               </td>
            </FormGroup>

            <FormGroup>
               <Label for="exampleEmail">Email</Label>
               <td width="1200" style={tdStyle}>
                  admin@gmail.com
               </td>
            </FormGroup>

            <FormGroup>
               <Label for="examplePassword">Password</Label>
               <Row>
                  <Col md={8}>
                     <Input id="examplePassword" name="password" type="password" value={password}></Input>
                  </Col>
                  <Col md={4}>
                     <Button>Change password</Button>
                  </Col>
               </Row>
            </FormGroup>
            <FormGroup>
               <Label>Số dư tài khoản</Label>
               <td width="1200" style={tdStyle}>
                  {100000000} VNĐ
               </td>
            </FormGroup>
         </Form>
      </div>
   );
}
export default UserInfor;
