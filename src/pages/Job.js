/* eslint-disable react/no-direct-mutation-state */
/* eslint-disable no-undef */
import React, { Component } from 'react'


import Navigation from '../pages/Nav';
import Footer from '../pages/Footer';

import {
  Row, Col, Container, Button, UncontrolledCollapse,
  Card, CardTitle, CardText, Form, FormGroup, Spinner , Input,
} from 'reactstrap'


import { Link } from 'react-router-dom'
import styled from 'styled-components'

import {connect} from 'react-redux';
import {getJob} from './../redux/action/job';

class Job extends Component {

  constructor(props){
    super(props)
    this.state = {
      data: {},
      info: {},
      prev: '',
      next: '',
      searchNameJob: '%%',
      searchNameCompany: '%%',
      isLoading: true,
      message: '',
      sortBy: 'date_updated',
    }
  }
  
  componentDidMount(){
    this.getData()
  }

  getData = async()=>{
    const query = this.state.sortBy+'=DESC&&searchNameJob='+ this.state.searchNameJob+'&&searchNameCompany='+this.state.searchNameCompany;
    // const job = await axios.get(page!==undefined?page:'http://34.205.156.175:3001/job?'+this.state.sortBy+'=DESC&&searchNameJob='+ this.state.searchNameJob+'&&searchNameCompany='+this.state.searchNameCompany)
    this.props.dispatch(getJob(query)).then(res => {
      console.log(res.action.payload.data.result);
      console.log(res.action.payload.data.info);
      this.setState({
        data: res.action.payload.data.result,
        info: res.action.payload.data.info,
        prev: res.action.payload.data.info.prev,
        next: res.action.payload.data.info.next,
        isLoading: false,
      })
    })
  }

  buttonPress = async()=>{
    this.setState({isLoading:true})
    this.getData().then(data=>{
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

  doSearch = async () => {
    this.getData()
      .then(data => {
        this.setState({data,
                      next:data.info.next,
                      prev:data.info.prev,
                      isLoading: false })
      })
      .catch(err => {
        console.log(err)
      })
  }

  handleOnInputChangeName = (event) => {
    const searchNameJob = event.target.value;
    this.setState({ 
      searchNameJob
    });
  };

  handleOnInputChangeCompany = (event) => {
    const searchNameCompany = event.target.value
    this.setState({
      searchNameCompany
    })
  }

  doSort = async (event) => {
    const sortBy = event.target.value;
    this.setState({
      sortBy
    })
    this.getData()
      .then(data => {
        this.setState({data,
                      next:data.info.next,
                      prev:data.info.prev,
                      isLoading: false })
      })
      .catch(err => {
        console.log(err)
      })
  }
  
  render() {
    
    return (  
      <Styled>
      <Navigation isLogged={this.props.isLogged} />   
        <Container><br/><br/>
          <Row className='justify-content-md-center rowBody'>
            {this.state.isLoading&&(
              <Spinner style={{ width: '3rem', height: '3rem' }} />
            )}
          </Row>
          {!this.state.isLoading&&
            <React.Fragment>
              <Form>
                <Row form>
                  <Col md={5}>
                    <FormGroup>
                      <Input type="text" onChange={this.handleOnInputChangeName} id="searchName" placeholder="Search new oppurtunities" className='searchBar'/>
                    </FormGroup>
                  </Col>
                  <Col md={5}>
                    <FormGroup>
                      <Input type="text" onChange={this.handleOnInputChangeCompany} id="searchCompany" placeholder="Search by Company" className='searchBar'/>
                    </FormGroup>
                  </Col>
                  <Col md={2}>
                    <FormGroup>
                        <Button onClick={()=>this.doSearch()} className='btnSearch' outline color='secondary'>Search</Button>
                    </FormGroup>
                  </Col>
                </Row>
              </Form>
              <Row className='rowBody'>
                <ul className='getCount'>
                  <li className='lblSort'>Get {this.state.info.totalData} results</li>
                </ul>
                <ul className='getSort'>
                  <li className='lblSort'>Sortby</li>
                    <li>
                      <Input type="select" onClick={this.doSort} sortBy={this.state.sortBy} className='sortBy'>
                      <option value='date_update' >Newest</option>
                      <option value='sortName'>Name</option>
                      <option value='sortCompany'>Company</option> 
                    </Input>
                  </li>
                </ul>
                
              </Row>
              {this.state.data.map((v,i)=>(
                
                <Row sm={{size:'auto'}} key={i.toString()} className='shadow p-3 mb-5 bg-white rounded rowBody'>
                  <Card body id={'toggler' + v.id_job.toString()} className='myCard'>
                    <CardTitle className='cardBody'>
                      <Row>
                        <Col md='1'>
                          <img src={v.logo} width="100%" className='logoComp' alt='Company Logo'/>
                        </Col>
                        <Col md='2'>
                          <Link onClick={()=>this.goToDetail(v.id_job)} className='titleJob'>{v.name_job}</Link>
                          <p className='descCard'>Req ID : {v.id_job}</p>
                        </Col>
                        <Col md='2'>
                          <p className='descCard'>Company</p>
                          <p className='catJob'>{v.name_company}</p>
                        </Col>
                        <Col md='1'>
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
                          <Link to='/' className='btn btn-outline-secondary btnApply'>Apply Now</Link>
                        </Col>
                      </Row>
                    </CardTitle>
                    <UncontrolledCollapse toggler={'#toggler' + v.id_job.toString()}>
                      <CardText>
                        {v.description_job.substr(0,50)}
                        <br/><br/>
                        <Link onClick={()=>this.goToDetail(v.id_job)} className='readMore'>Read More</Link>
                        </CardText>
                    </UncontrolledCollapse>
                  </Card>
                </Row>
              ))}
            </React.Fragment>
          }
          <Row className='nextPrev'>
            {
              this.state.prev === '' ? null : <Button color='secondary' outline onClick={()=>this.buttonPress(this.state.prev)}>Prev</Button>
            }
            <span>&nbsp;</span>
            {
              this.state.next === '' ? null : <Button color='secondary' outline onClick={()=>this.buttonPress(this.state.next)}>Next</Button>
            }
            
          </Row>
          <br/>
        </Container>
        <Footer />        
      </Styled>
    )
  }
}

const Styled = styled.div`
  .myCard {
    margin-bottom: 0;
  }
  .rowBody {
    margin:0;
  }
  .lblSort {
    align-self:center;
  }
  .getSort {
    padding: 0;
    justify-content: flex-end;
    list-style-type: none;
    float: right;
    width:25%;
    display: inline-flex;
  }
  .getCount {
    padding: 0px;
    list-style-type: none;
    float: left;
    width:75%;
    align-self: center;
  }
  .sortBy{
    background-color:#F1F1F1;
    border: none;
  }
  .nextPrev{
    justify-content: center;
  }
  .btnSearch {
    height: calc(1.5em + .75rem + 10px);
    border-radius: 5rem;
    font-size: 18px;
    padding: 0 40px;
    float:right;
  }
  .searchBar {
    border-radius: 5rem;
    height: calc(1.5em + .75rem + 10px);
  }
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
    font-size: 15px;
    border-radius: 50px;
    padding: 5px 10px;
  }
  .titleJob {
    color: #2387aa;
    font-size: 20px;
    line-height: 30px;
    cursor: pointer;
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
  .logoComp {
    heigth: 100px;
  }
`;

const mapStateProps = state => ({
  job: state.job
})

export default connect(mapStateProps)(Job);
