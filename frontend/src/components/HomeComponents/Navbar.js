import React from "react";
import { Button, Col, Input, Row } from "reactstrap";

function Navbar(props) {
   return (
      <div>
         <Row>
            <Col md={4}>
               <Input type="text" name="" id="input" className="form-control" required="required" pattern="" title=""></Input>
            </Col>
            <Col md={1}>
               <Button>
                  <i className="glyphicon glyphicon-search"></i>
               </Button>
            </Col>
            <Col md={1}>
               <Button>Món Á </Button>
            </Col>
            <Col md={2}>
               <Button>Món Âu </Button>
            </Col>
            <Col md={2}>
               <Button>CreateDate </Button>
            </Col>
            <Col md={1}>
               <Button>Vote </Button>
            </Col>
            <Col md={1}>
               <i className="glyphicon glyphicon-filter"></i>
            </Col>
         </Row>
      </div>
   );
}

export default Navbar;
