import React from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

function RechargeMoney(props) {
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
               <Label for="exampleText">Tên tài khoản</Label>
               <Input></Input>
            </FormGroup>
            <FormGroup>
               <Label>Nhập số tiền</Label>
               <Input type="number"></Input>
            </FormGroup>
            <FormGroup>
               <Label>Nội dung chuyển khoản</Label>
               <Input></Input>
            </FormGroup>

            <h6>Sau khi chuyển khoản thành công, chọn Submit để kết thúc</h6>
            <Button>Submit</Button>
         </Form>
      </div>
   );
}

export default RechargeMoney;
