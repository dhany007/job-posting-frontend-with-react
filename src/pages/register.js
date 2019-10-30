import React from 'react';
import { 
  UncontrolledCollapse, Col, Row,
  Card, Container, CardTitle, CardText
} from 'reactstrap';
import { Link } from 'react-router-dom'

const Example = (props) => {

  return (
    <Container>
      <Row>
      <Card body id='toggler'>
        <CardTitle>
          <Row>
            <Col>.col</Col>
            <Col>.col</Col>
            <Col>.col</Col>
            <Col>.col</Col>
            <Col><Link to="/Register" className='btn btn-primary'>Apply</Link></Col>
          </Row>
        </CardTitle>
        <UncontrolledCollapse toggler="#toggler">
          <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
        </UncontrolledCollapse>
      </Card>
      </Row>
    </Container>
  );
}

export default Example;