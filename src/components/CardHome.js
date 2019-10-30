import React from 'react';
import {
  Card, CardImg, CardText,
  CardTitle, Container, Row, 
  Col,
} from 'reactstrap';

import styled from 'styled-components'

const Styles = styled.div`
.MyCard {
  text-align: center;
}
.titleCard {
  color: #1f1f1e;
  font-size: 1.25rem;
}
.myImg {
  height: 318px;
  width: 180px;
}`;

const CardHome = (props) => {
  return (
    <div>
      <Container>
        <Styles>
          <Row className="MyCard">
            <Col sm="4">
              <Card body>
                <CardTitle className='titleCard'>Professional Identity</CardTitle>
                <CardImg className= "myImg" top width="100%" src='../assets/card1.jpg' alt="Card image cap" />
                <CardText>Build your professional identity online and stay connected with opportunities.</CardText>
              </Card>
            </Col>
            <Col sm="4">
              <Card body>
                <CardTitle className='titleCard'>Your Personal Page</CardTitle>
                <CardImg className= "myImg" top width="100%" src="../assets/card2.png" alt="Card image cap" />
                <CardText>Log in to your personal page and view jobs that match you.</CardText>
              </Card>
            </Col>
            <Col sm="4">
              <Card body>
                <CardTitle className='titleCard'>Richer Job Ads</CardTitle>
                <CardImg className= "myImg" top width="100%" src="../assets/card3.jpg" alt="Card image cap" />
                <CardText>Get Salary Matching, Location Map and Company Insights.</CardText>
              </Card>
            </Col>
          </Row>
        </Styles>
      </Container>
    </div>
    
  );
};

export default CardHome;