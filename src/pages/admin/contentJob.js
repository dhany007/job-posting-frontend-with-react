import React, { Component } from 'react'
import axios from 'axios'
import qs from 'qs'


import {
  Table, Modal, ModalBody, Row,
  ModalFooter, ModalHeader, Button, Card,
  FormGroup, Input, Col, Label, Form, Spinner, 
} from 'reactstrap'

import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';

export default class ContentJob extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modalAdd: false,
      modalUpdate: false,
      modalDelete: false,
      data:{},
      prev:'',
      next:'',
      isLoading:true,
      isLogin: true,

      name_job : '',
      description_job: '',
      category : '',
      salary : '',
      location_job : '',
      company : '',


    }
    this.toggleAdd = this.toggleAdd.bind(this);
    this.toggleUpdate = this.toggleUpdate.bind(this);
    this.toggleDelete = this.toggleDelete.bind(this);
    this.getData = this.getData.bind(this)
  }

  componentDidMount(){
    this.getData().then(data=>{
      this.setState({
        data,
        isLoading: false,
        prev: data.info.prev,
        next: data.info.next,
      })
    })
  }

  getData = async(page)=>{
    const job = await axios.get(page!==undefined?page:'http://34.205.156.175:3001/job')
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


  toggleAdd = () => {
    this.setState(prevState => ({
      modalAdd: !prevState.modalAdd,
      })
    )
  }

  toggleUpdate = () =>{
    this.setState(prevState => ({
      modalUpdate: !prevState.modalUpdate,
      })
    )
  }

  toggleDelete = () =>{
    this.setState(prevState => ({
      modalDelete: !prevState.modalDelete,
      })
    )
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]:event.target.value
    })
  }
  
  //get token
  getToken =  () => {
    const resultToken = localStorage.getItem('token')
    console.log(resultToken);
    return resultToken;
  }

  // add job
  handleSubmitAdd = (event) => {
    event.preventDefault()
   
    const data = {
      name_job : this.state.name_job,
      description_job: this.state.description_job,
      category : this.state.category,
      salary : this.state.salary,
      location_job : this.state.location_job,
      company : this.state.company
    };
    console.log(data)

    axios({
      method: 'POST',
      url: 'http://34.205.156.175:3001/job',
      data: qs.stringify(data),
      headers : {
        'content-Type': 'application/x-www-form-urlencoded',
        'x-access-token': this.getToken(),
      }
    })
    .then(res => {
      this.getData().then(data=>{
        this.setState({
          data,
        })
      })
    })
    .catch(err => {
      console.log(err)
    })
  }

  //delete Job
  handleSubmitDelete = (id) => {
    axios({
      method: 'DELETE',
      url: 'http://34.205.156.175:3001/job'+id,
      headers : {
        'content-Type': 'application/x-www-form-urlencoded',
        'x-access-token': this.getToken(),
      }
    })
    .then(res => {
      this.getData().then(data=>{
        this.setState({
          data,
        })
      })
    })
    .catch(err => {
      console.log(err)
    })
  }

  //patch job
  handleSubmitUpdate = (id) => {
    const data = {
      name_job : this.state.name_job,
      description_job: this.state.description_job,
      category : this.state.category,
      salary : this.state.salary,
      location_job : this.state.location_job,
      company : this.state.company
    };
    console.log(data)
    axios({
      method: 'PATCH',
      url: 'http://34.205.156.175:3001/job'+id,
      data: qs.stringify(data),
      headers : {
        'content-Type': 'application/x-www-form-urlencoded',
        'x-access-token': this.getToken(),
      }
    })
    .then(res => {
      this.getData().then(data=>{
        this.setState({
          data,
        })
      })
    })
    .catch(err => {
      console.log(err)
    })
  }
  render() {
    return (
      <div className="content-wrapper">
      {/* Content Header (Page header) */}
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Job</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item"><Link to='/dashboard'>Home</Link></li>
                <li className="breadcrumb-item active">Job</li>
              </ol>
            </div>
          </div>
        </div>{/* /.container-fluid */}
      </section>
      {/* Main content */}
      <section className="content">
        <div className="container-fluid">
          <Row className='justify-content-md-center rowBody'>
            {this.state.isLoading&&(
              <Spinner style={{ width: '3rem', height: '3rem' }} />
            )}
          </Row>
          <Styled> 
              <Card className='cardJob'>
                <Button color='primary' onClick={this.toggleAdd}> <span><FontAwesomeIcon icon={faPlus}/>&nbsp;Add new Job</span> </Button> <br/><br/>
                {/* Modal Add Job */}
                <Modal isOpen={this.state.modalAdd} toggle={this.toggleAdd} className='modal-lg'>
                    <Form onSubmit={this.handleSubmitAdd}>
                  <ModalHeader toggle={this.toggleAdd}>Add new Job</ModalHeader>
                  <ModalBody>
                      <FormGroup row>
                        <Label sm={2}>Name</Label>
                        <Col sm={10}>
                          <Input 
                          type='text'
                          name='name_job'
                          onChange={this.handleChange}
                          placeholder='Enter name of job' />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm={2}>Description</Label>
                        <Col sm={10}>
                          <Input
                            type='textarea'
                            name='description_job'
                            onChange={this.handleChange}
                            placeholder='enter description job'
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm={2}>Category</Label>
                        <Col sm={10}>
                          <Input
                            type='number'
                            name='category'
                            onChange={this.handleChange}
                            placeholder='Enter category (update soon)'/>
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm={2}>Salary</Label>
                        <Col sm={10}>
                          <Input 
                            type='number'
                            name='salary'
                            onChange={this.handleChange}
                            placeholder='Enter salary' />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm={2}>Location Job</Label>
                        <Col sm={10}>
                          <Input
                            type='text'
                            name='location_job'
                            onChange={this.handleChange}
                            placeholder='Enter location job' />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm={2}>Company</Label>
                        <Col sm={10}>
                          <Input
                            type='number'
                            name='company'
                            onChange={this.handleChange}
                            placeholder='Enter company (update soon)'/>
                        </Col>
                      </FormGroup>
                  </ModalBody>
                  <ModalFooter>
                    <Button type='submit' color='primary' onClick={this.toggleAdd}>Submit</Button>{' '}
                    <Button color='secondary' onClick={this.toggleAdd}>Cancel</Button>
                  </ModalFooter>
                    </Form>
                </Modal>

            <Table hover responsive className='tableJob'>
              <thead>
                <tr>
                  <th>ID Job</th>
                  <th>Name</th>
                  <th>Salary</th>
                  <th>Location</th>
                  <th>Category</th>
                  <th>Company</th>
                  <th>Last Updated</th>
                  <th>Action</th>
                </tr>
              </thead>
          {!this.state.isLoading&&
          <React.Fragment>
            {this.state.data.result.map((v,i)=>(
              <tbody >
                <tr key={i.toString()}>
                  <th scope='row' className='align-middle'>{v.id_job}</th>
                  <td className='align-middle'>{v.name_job}</td>
                  <td className='align-middle'>{v.salary}</td>
                  <td className='align-middle'>{v.location_job}</td>
                  <td className='align-middle'>{v.name_category}</td>
                  <td className='align-middle'>{v.name_company}</td>
                  <td className='align-middle'>{v.date_update.toLocaleString().replace(/T/, ' ').replace(/\..+/, '')}</td>
                  <td className='actionJob'>
                    
                    {/* Update Job */}
                    <button type="button" className="btn btn-warning" data-toggle="modal" data-target= {'#bbb'+v.id_job}>
                      <span><FontAwesomeIcon icon={faEdit}/></span>
                    </button>&nbsp;&nbsp;
                    
                    <div className="modal fade" id={'bbb'+v.id_job} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                      <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title" >Update Job</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          <Form>
                          <div class="modal-body">
                          <FormGroup row>
                            <Label sm={2}>Name</Label>
                            <Col sm={10}>
                              <Input 
                              type='text'
                              name='name_job'
                              onChange={this.handleChange}
                              defaultValue= {v.name_job}
                              placeholder='Enter name of job' />
                            </Col>
                          </FormGroup>
                          <FormGroup row>
                            <Label sm={2}>Description</Label>
                            <Col sm={10}>
                              <Input
                                type='textarea'
                                name='description_job'
                                onChange={this.handleChange}
                                defaultValue= {v.description_job}
                                placeholder='enter description job'
                              />
                            </Col>
                          </FormGroup>
                          <FormGroup row>
                            <Label sm={2}>Category</Label>
                            <Col sm={10}>
                              <Input
                                type='number'
                                name='category'
                                onChange={this.handleChange}
                                placeholder='Enter category (update soon)'/>
                            </Col>
                          </FormGroup>
                          <FormGroup row>
                            <Label sm={2}>Salary</Label>
                            <Col sm={10}>
                              <Input 
                                type='number'
                                name='salary'
                                onChange={this.handleChange}
                                defaultValue= {v.salary}
                                placeholder='Enter salary' />
                            </Col>
                          </FormGroup>
                          <FormGroup row>
                            <Label sm={2}>Location Job</Label>
                            <Col sm={10}>
                              <Input
                                type='text'
                                name='location_job'
                                onChange={this.handleChange}
                                defaultValue= {v.location_job}
                                placeholder='Enter location job' />
                            </Col>
                          </FormGroup>
                          <FormGroup row>
                            <Label sm={2}>Company</Label>
                            <Col sm={10}>
                              <Input
                                type='number'
                                name='company'
                                onChange={this.handleChange}
                                placeholder='Enter company (update soon)'/>
                            </Col>
                          </FormGroup>
                              
                          </div>
                          <div class="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-warning" onClick={()=>this.handleSubmitUpdate(v.id_job)} data-dismiss="modal" >Save changes</button>
                          </div>
                          </Form>
                        </div>
                      </div>
                    </div>
                    {/* Modal Update Job */}
                    {/* <Modal isOpen={this.state.modalUpdate} toggle={this.toggleUpdate} className='modal-lg'>
                      <ModalHeader toggle={this.toggleUpdate}>Update Job</ModalHeader>
                        <ModalBody>
                          <Form>
                            <FormGroup row>
                              <Label sm={2}>Name</Label>
                              <Col sm={10}>
                                <Input type='text'name='name_job' placeholder='Enter name of job' value = {v.name_job}/>
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Label sm={2}>Description</Label>
                              <Col sm={10}>
                                <Input type='textarea' name='description_job' id='exampleText' value = {v.description_job}/>
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Label sm={2}>Category</Label>
                              <Col sm={10}>
                                <Input type='select' name='category'>
                                  <option>Select Category</option>
                                  <option>1</option>
                                  <option>2</option>
                                  <option>3</option>
                                </Input>
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Label sm={2}>Salary</Label>
                              <Col sm={10}>
                                <Input type='number' name='salary' placeholder='Enter salary' value = {v.salary}/>
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Label sm={2}>Location Job</Label>
                              <Col sm={10}>
                                <Input type='text' name='location_job' placeholder='Enter location job' value = {v.location_job}/>
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Label sm={2}>Company</Label>
                              <Col sm={10}>
                                <Input type='select' name='company'>
                                  <option>Select Company</option>
                                  <option>1</option>
                                  <option>2</option>
                                  <option>3</option>
                                </Input>
                              </Col>
                            </FormGroup>
                          </Form>
                        </ModalBody>
                        <ModalFooter>
                          <Button type='submit' color='primary'>Update</Button>{' '}
                          <Button color='secondary' onClick={this.toggleUpdate}>Cancel</Button>
                        </ModalFooter>
                    </Modal> */}

                   {/* Delete item  */}
                   <button type="button" className="btn btn-danger" data-toggle="modal" data-target= {'#aaa'+v.id_job}>
                          <span><FontAwesomeIcon icon={faTrash}/></span>
                        </button>

                        <div className="modal fade" id={'aaa'+v.id_job} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                          <div className="modal-dialog" role="document">
                            <div className="modal-content">

                              <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Warning!</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                  <span aria-hidden="true">&times;</span>
                                </button>
                              </div>
                              <div class="modal-body">
                                Are you sure want to permanently delete the selected item(s) ? 
                              </div>
                              <div class="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-danger" onClick={()=>this.handleSubmitDelete(v.id_job)} data-dismiss="modal">Delete</button>
                              </div>
                            </div>
                          </div>
                        </div>
                  </td>
                </tr>
              </tbody>
            ))}
          </React.Fragment>
          }
          </Table>
           <Row className='nextPrev'>
            {
              this.state.prev === '' ? null : <Button color='secondary' outline onClick={()=>this.buttonPress(this.state.prev)}>Prev</Button>
            }
            <span>&nbsp;</span>
            {
              this.state.next === '' ? null : <Button color='secondary' outline onClick={()=>this.buttonPress(this.state.next)}>Next</Button>
            }
          </Row>
          </Card>
          </Styled> 
        
    </div>
      </section>
    </div>
    )
  }
}

const Styled = styled.div`
  .actionJob {
    display: flex;
    border-top: 0;
  }
  .cardJob {
    display: inline-block;
    margin: 0 auto;
    padding: 20px;
    width: 100%;
  }
  .tableJob {
    margin-bottom: 0;
  }
  .nextPrev{
    justify-content: center;
  }
`;