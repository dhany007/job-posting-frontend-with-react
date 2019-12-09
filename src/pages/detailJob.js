import React, { Component } from 'react'

import Navigation from './Nav';
import Footer from './Footer';

import {
  Row, Col, Container, Card, Spinner,
} from 'reactstrap'


import { Link } from 'react-router-dom'
import styled from 'styled-components'

import {connect} from 'react-redux';
import {getOneJob} from '../redux/action/job';

class DetailJob extends Component {
  constructor(props){
    super(props)
    this.state = {
      id_job: this.props.match.params.id_job,
      data: {}
    }
  }
  
  componentDidMount(){
    this.getOneData(this.state.id_job);
  }

  getOneData = async(id_job)=>{
    console.log(this.state.id_job)
    await this.props.dispatch(getOneJob(id_job)).then(res=>{
      console.log(res.action.payload.data.result[0])
      this.setState({
        data:res.action.payload.data.result[0],
      })
    })
  }


  render() {
    console.log(this.state.data)
    return (
      <React.Fragment>
      <Navigation isLogged={this.props.isLogged}/>
      <Styled> 
        <Container><br/><br/>
        {!this.state.data.id_job&&(
          <React.Fragment>
            <Spinner style={{ width: '3rem', height: '3rem'}} />
          </React.Fragment>
          
        )}<br/>
        {this.state.data.id_job&&(
          <React.Fragment>
            <Card className='cardDetail'>
            <Row>
              <Col sm='3' className='contLogo'>
                <img src={this.state.data.logo} className='logoComp' alt='Company Logo'/>
              </Col>
              <Col sm='6'>
                <h1>{this.state.data.name_job}</h1>
                <p><strong>Location : </strong> {this.state.data.location_job}</p>
                <p><strong>Category : </strong> {this.state.data.name_category}</p>
                <p><strong>Req ID : </strong> {this.state.data.id_job}</p>
                <p><strong>Company : </strong> {this.state.data.name_company}</p>
                <p><strong>Updated at : </strong> {this.state.data.date_update.toLocaleString().replace(/T/, ' ').replace(/\..+/, '')}</p>
                
              </Col>
              <Col sm='3' className='stickyItem'>
                <Link to='/' className='btn btn-primary btnApply'>Apply Now</Link>
              </Col>
            </Row>
            <hr/>
            <Row>
              <p className='descJob'><strong>DESCRIPTION JOB</strong> <br/>{this.state.data.description_job}</p>
            </Row>
            </Card>
          </React.Fragment>
        )

        }<br/><br/>
        </Container>
        <Footer />
      </Styled>
      </React.Fragment>
    )
  }
}

const Styled = styled.div`
.descJob {
  text-align: justify
}
.contLogo {
  align-self: center
}
.logoComp {
  width: 200px;
}
.cardDetail {
  padding : 50px;
}
.btnApply {
  align-items: center;
  font-size: 18px;
  border-radius: 20px;
  padding: 0 20px;
  position: sticky;
  padding: 9px 50px;
}
.stickyItem {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: sticky;
}
`;

const mapStateProps = state => ({
  job: state.job
})

export default connect(mapStateProps)(DetailJob);