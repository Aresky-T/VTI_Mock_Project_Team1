import React from "react";
import { Button, Col, Form, FormGroup, Row } from "reactstrap";
import Menu from "../Page/Menu";
import routes from "../Router/Routes";

function TopComponent(props) {
   return (
      <div>
         <Form>
            <FormGroup>
               <Row>
                  <Col md={3}>
                     <h1>FOOD RECIPE</h1>
                  </Col>
                  <Col md={4}>
                     <Menu />
                  </Col>
                  <Col md={2}>
                     <h5>Số dư TK: 10000000</h5>
                  </Col>
                  <Col md={1}>
                     <Button>
                        <i className="glyphicon glyphicon-envelope"></i>
                     </Button>
                  </Col>
                  <Col md={1}>
                     <Button>Sigout </Button>
                  </Col>
               </Row>
            </FormGroup>
         </Form>
         <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">{routes}</div>
         </div>
      </div>
   );
}

export default TopComponent;
