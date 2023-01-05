import React from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

function WithdrawMoney(props) {
   return (
      <div>
         <Form>
            <FormGroup>
               <Label for="exampleSelect">Select bank</Label>
               <Input id="exampleSelect" name="select" type="select">
                  <option>MB</option>
                  <option>BIDV</option>
                  <option>Agribank</option>
                  <option>Vietcombank</option>
                  <option>SHB</option>
                  <option>SaigonBank</option>
                  <option>ViettinBank</option>
                  <option>ViettinBank</option>
                  <option>ViettinBank</option>
               </Input>
            </FormGroup>
            <FormGroup>
               <Label for="exampleSelect">Số tài khoản</Label>
               <Input></Input>
            </FormGroup>
            <FormGroup>
               <Label>Nhập số tiền</Label>
               <Input type="number"></Input>
            </FormGroup>
            <FormGroup>
               <Label>Mật khẩu rút tiền</Label>
               <Input></Input>
            </FormGroup>

            <Button>Rút tiền</Button>
         </Form>
      </div>
   );
}

export default WithdrawMoney;
