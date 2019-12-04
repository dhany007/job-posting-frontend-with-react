import React, { Component } from 'react'
import axios from 'axios'
import qs from 'qs'


import {
  Table, Button, Modal, Card, Spinner, Row,
  ModalHeader, ModalBody, ModalFooter,
  Label, Input, Col, FormGroup, Form
} from 'reactstrap'

import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';


export default class ContentCategory extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name_category: '',

      data:{},
      isLoading:true,
      modalAdd: false,
      modalUpdate: false,
      modalDelete: false,
    }

    this.toggleAdd = this.toggleAdd.bind(this);

    this.getData = this.getData.bind(this);
    this.handleSubmitAdd = this.handleSubmitAdd.bind(this)
    this.handleChangeAdd = this.handleChangeAdd.bind(this)
    this.handleSubmitDelete = this.handleSubmitDelete.bind(this)
    this.handleSubmitUpdate = this.handleSubmitUpdate.bind(this)
  }

  componentDidMount(){
    this.getData().then(data=>{
      this.setState({
        data,
        isLoading: false,
      })
    })
  }

  toggleAdd = () =>{
    this.setState(prevState => ({
      modalAdd: !prevState.modalAdd,
    }))
  }

  // Get all category
  getData = async(page)=>{
    const job = await axios.get(page!==undefined?page:'http://34.205.156.175:3001/category')
    return job.data
  }

  //get token
  getToken = () => {
    const token = localStorage.getItem('token')
    return token
  }


  // onchange
  handleChangeAdd = (event) => {
    event.preventDefault()
    this.setState({
      name_category: event.target.value
    })
  }

  // add category
  handleSubmitAdd = (event) => {
    event.preventDefault()
    const name_category = this.state.name_category
    const data = {
      name_category: name_category
    }
    axios({
      method: 'POST',
      url: 'http://34.205.156.175:3001/category/',
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


  //delete category
  handleSubmitDelete = (id) => {
    axios({
      method: 'DELETE',
      url: 'http://34.205.156.175:3001/category/'+id,
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

  //patch category
  handleSubmitUpdate = (id) => {
    const data = {
      name_category: this.state.name_category
    }
    console.log(data)
    axios({
      method: 'PATCH',
      url: 'http://34.205.156.175:3001/category/'+id,
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
                <li className="breadcrumb-item"><Link to='/'>Home</Link></li>
                <li className="breadcrumb-item active">Category</li>
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
              <Card className='cardCategory'>
                <Button color='primary' onClick={this.toggleAdd} ><span><FontAwesomeIcon icon={faPlus}/>&nbsp;Add new Category</span> </Button> <br/><br/>
                {/* Modal Add Category */}
                <Modal isOpen={this.state.modalAdd} toggle={this.toggleAdd}>
                  <Form onSubmit={this.handleSubmitAdd}>
                  <ModalHeader toggle={this.toggleAdd}>Add new Category</ModalHeader>
                  <ModalBody>
                      <FormGroup row>
                        <Label sm={2}>Name</Label>
                        <Col sm={10}>
                          <Input
                            type='text'
                            name='name_category'
                            onChange={this.handleChangeAdd}
                            placeholder='Enter name of Category' />
                        </Col>
                      </FormGroup>
                  </ModalBody>
                  <ModalFooter>
                    <Button type='submit' color='primary' onClick={this.toggleAdd}>Submit</Button>{' '}
                    <Button color='secondary' onClick={this.toggleAdd}>No</Button>
                  </ModalFooter> 
                  </Form>
                </Modal>

                <Table hover responsive className='tableCategory'>
                  <thead>
                    <tr>
                      <th>ID Category</th>
                      <th>Name</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  {!this.state.isLoading&&
                <React.Fragment>
                  {this.state.data.result.map((v,i)=>(
                  <tbody >
                    <tr key={i.toString()} >
                      <th scope='row' className='align-middle'>{v.id_category}</th>
                      <td className='align-middle'>{v.name_category}</td>
                      <td className='actionCategory'>

                        {/* Update category */}
                        <button type="button" className="btn btn-warning" data-toggle="modal" data-target= {'#bbb'+v.id_category}>
                          <span><FontAwesomeIcon icon={faEdit}/></span> 
                        </button>&nbsp;&nbsp;

                        <div className="modal fade" id={'bbb'+v.id_category} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                          <div className="modal-dialog" role="document">
                            <div className="modal-content">
                              <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Update Category</h5>
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
                                        name='name_company'
                                        onChange={this.handleChangeAdd}
                                        defaultValue={v.name_category}
                                        placeholder='Enter name of Category' />
                                    </Col>
                                  </FormGroup>
                              </div>
                              <div class="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-warning" onClick={()=>this.handleSubmitUpdate(v.id_category)} data-dismiss="modal">Save changes</button>
                              </div>
                              </Form>
                            </div>
                          </div>
                        </div>
                      

                        {/* Delete item  */}
                        <button type="button" className="btn btn-danger" data-toggle="modal" data-target= {'#aaa'+v.id_category}>
                          <span><FontAwesomeIcon icon={faTrash}/></span>
                        </button>

                        <div className="modal fade" id={'aaa'+v.id_category} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                                <button type="button" className="btn btn-danger" onClick={()=>this.handleSubmitDelete(v.id_category)} data-dismiss="modal">Delete</button>
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
              </Card>
          </Styled>
        </div>
      </section>
    </div>
    )
  }
}

const Styled = styled.div`
  .actionCategory {
    display: flex;
    border-top: 0;
  }
  .cardCategory {
    display: inline-block;
    margin: 0 auto;
    padding: 20px;
    width: 100%;
  }
  .tableCategory   {
    margin-bottom: 0;
  }
`;