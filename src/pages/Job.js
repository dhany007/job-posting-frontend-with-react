/* eslint-disable no-undef */
import React, { Component } from 'react'
import axios from 'axios'
import {
  Row, Col, Container, Button, UncontrolledCollapse,
  Card, CardTitle, CardText
} from 'reactstrap'

import { Link } from 'react-router-dom'
import styled from 'styled-components'

export default class Job extends Component {
  constructor(props){
    super(props)
    this.state = {
      data:{},
      prev:'',
      next:'',
      isLoading:true
    }
  }
  componentDidMount(){
    this.getData().then(data=>{
      this.setState({
        data,
        prev: data.info.prev,
        next: data.info.next,
        isLoading: false
      })
    })
  }

  getData = async(page)=>{
    const job = await axios.get(page!==undefined?page:'http://localhost:3001/')
    return job.data
  }
  buttonPress = async(page)=>{
    this.setState({isLoading:true})
    this.getData(page).then(data=>{
      this.setState({
        data,
        next: data.info.next,
        prev: data.info.prev,
        isLoading: false
      })
    })
  }
  
  goToDetail = (id_job)=>{
    this.props.history.push('/detail/'+id_job)
  }

  render() {
    console.log(this.state.data.result)
    return (
      <Styled>
        <Container>
          <Row className='justify-content-md-center'>
            {this.state.isLoading&&(
              <Col>Loading...</Col>
            )}
          </Row>
          {!this.state.isLoading&&
            <React.Fragment>
              {this.state.data.result.map((v,i)=>(
                <Row sm={{size:'auto'}} key={i.toString()} className='shadow p-3 mb-5 bg-white rounded'>
                  <Card body id={'toggler' + v.id_job.toString()}>
                    <CardTitle className='cardBody'>
                      <Row>
                        <Col md='4'>
                          <Link onClick={()=>this.goToDetail(v.id_job)} className='titleJob' style={{cursor:'pointer'}}>{v.name_job}</Link>
                          <p className='descCard'>Req ID : {v.id_job}</p>
                        </Col>
                        <Col md='2'>
                          <p className='descCard'>Location</p>
                          <p className='catJob'>{v.location_job}</p>
                        </Col>
                        <Col md='2'>
                          <p className='descCard'>Category</p>
                          <p className='catJob'>{v.name_category}</p>
                        </Col>
                        <Col md='2'>
                          <p className='descCard'>Updated</p>
                          <p className='catJob'>{v.date_update.toLocaleString().replace(/T/, ' ').replace(/\..+/, '')}</p>
                        </Col>
                        <Col md='2' className='buttonApply'>
                          <Link to='/' className='btn btn-primary btnApply'>Apply Now</Link>
                        </Col>
                      </Row>
                    </CardTitle>
                    <UncontrolledCollapse toggler={'#toggler' + v.id_job.toString()}>
                      <CardText>
                        {v.description_job}
                        <br/><br/>
                        <Link onClick={()=>this.goToDetail(v.id_job)} className='readMore'>Read More</Link>
                        </CardText>
                    </UncontrolledCollapse>
                  </Card>
                </Row>
              ))}
            </React.Fragment>
          }
          <Row>
            {
              this.state.prev === '' ? null : <Button color='primary' onClick={()=>this.buttonPress(this.state.prev)}>Prev</Button>
            }
            <span>&nbsp;</span>
            {
              this.state.next === '' ? null : <Button color='primary' onClick={()=>this.buttonPress(this.state.next)}>Next</Button>
            }
            
          </Row>
        </Container>
      </Styled>
    )
  }
}

const Styled = styled.div`
  .card-body:hover{
    background-color: #EFF0F1;
  }
  .mb-5, .my-5 {
    margin-bottom: 1rem!important;
  }
  .cardBody {
    margin-bottom: 0px;
    border-style:none;
  }
  .card-body {
    border-style:none;
  }
  .buttonApply {
    align-self: center;
  }
  .btnApply {
    font-size: 18px;
    border-radius: 50px;
    padding: 0 20px;
  }
  .titleJob {
    color: #2387aa;
    font-size: 20px;
    line-height: 30px;
  }
  .descCard {
    font-size: 15px;
    color: #888;
  }
  .catJob{
    font-size: 17px;
    color: black;
  }
  .readMore {
    font-weight: 600
    color: #2387aa
  }
`;
