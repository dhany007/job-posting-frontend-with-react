import React, { Component } from 'react'
import axios from 'axios'
import qs from 'qs'


import {
  Table, Spinner, Row, Button, Modal, Card,
  ModalHeader, ModalBody, ModalFooter,
  Label, Input, FormText, Col, FormGroup, Form
} from 'reactstrap'

import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus, faBullseye } from '@fortawesome/free-solid-svg-icons';

import {connect} from 'react-redux';
import {getCompany, addCompany} from './../../redux/action/company';

class ContentCompany extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name_company: '',
      logo: '',
      description_company: '',
      data: {},
      info: {},


      modalAdd: false,
      modalUpdate: false,
    }

    this.toggleAdd = this.toggleAdd.bind(this);
    this.getData = this.getData.bind(this);
    this.handleSubmitAdd = this.handleSubmitAdd.bind(this)
    this.handleSubmitDelete = this.handleSubmitDelete.bind(this)
    //this.handleSubmitUpdate = this.handleSubmitUpdate.bind(this)
    
  }

  componentDidMount(){
    this.getData()
  }

  // Get all Company
  getData = async()=>{
    await this.props.dispatch(getCompany())
  }

  //get token
  getToken = () => {
    const token = localStorage.getItem('token')
    return token
  }

  //add Company
  addCompany = async(data, token)=>{
    await this.props.dispatch(addCompany(data, token))
  }

  
  toggleAdd = () =>{
    this.setState(prevState => ({
      modalAdd: !prevState.modalAdd,
    }))
  }

  //onchange
  handleNameChange = (event) => {
    event.preventDefault()
    this.setState({
      name_company: event.target.value,
      
    })
    console.log(this.state.name_company)
  }
  handleDecChange = (event) => {
    event.preventDefault()
    this.setState({
      description_company: event.target.value,

    })
    console.log(this.state.description_company)
  }
  handleLogoChange = (event) => {
    event.preventDefault()
    this.setState({
      logo: event.target.files[0],

    })
  }

  //add company 
  handleSubmitAdd = (event) => {
    event.preventDefault()
    const formData = new FormData()
    formData.append('name_company', event.target.name_company.value)
    formData.append('description_company', event.target.description_company.value)
    formData.append('logo', event.target.logo.files[0])
    console.log(formData)
    this.addCompany(formData, this.getToken())
    .then(res => {
      this.getData()
    })
    .catch(err => {
      console.log(err)
    })
  }

  //update company
  // handleSubmitUpdate = (id) => {
    
  //   const formData = new FormData()
    
  //   formData.append('name_company', event.target.name_company.value)
  //   formData.append('description_company', event.target.description_company.value)
  //   formData.append('logo', event.target.logo.files[0])

  //   console.log(id)
  //   axios({
  //     method: 'PATCH',
  //     url: 'http://34.205.156.175:3001/company/'+id,
  //     data: formData,
  //     headers : {
  //       'content-Type': 'application/x-www-form-urlencoded',
  //       'x-access-token': this.getToken(),
  //     }
  //   })
  //   .then(res => {
  //     this.getData().then(data=>{
  //       console.log(data)
  //       this.setState({
  //         data,
  //       })
  //     })
  //   })
  //   .catch(err => {
  //     console.log(err)
  //   })
  // }

  //delete company
  handleSubmitDelete = (id) => {
    axios({
      method: 'DELETE',
      url: 'https://freejobpost.site/company/'+id,
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
    console.log('masuk kesini bg ')
    console.log(this.state.data)
    return (
      <div className="content-wrapper">
      {/* Content Header (Page header) */}
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Company</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item"><Link to='/'>Home</Link></li>
                <li className="breadcrumb-item active">Company</li>
              </ol>
            </div>
          </div>
        </div>{/* /.container-fluid */}
      </section>
      {/* Main content */}
      <section className="content">
        <div className="container-fluid">
        <Row className='justify-content-md-center rowBody'>
            {this.props.company.isLoading&&(
              <Spinner style={{ width: '3rem', height: '3rem' }} />
            )}
        </Row>
      <Styled> 
          <Card className='cardCompany'>
            <Button color='primary' onClick={this.toggleAdd} ><span><FontAwesomeIcon icon={faPlus}/>&nbsp;Add new Company</span> </Button> <br/><br/>
            
            {/* Modal Add Company */}
            <Modal isOpen={this.state.modalAdd} toggle={this.toggleAdd}>
              <Form onSubmit={this.handleSubmitAdd}>
              <ModalHeader toggle={this.toggleAdd}>Add new Company</ModalHeader>
              <ModalBody>
                  <FormGroup row>
                    <Label sm={2}>Name</Label>
                    <Col sm={10}>
                      <Input
                        type='text'
                        name='name_company'
                        onChange={this.handleNameChange}
                        placeholder='Enter name of Company'
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label sm={2}>Description</Label>
                    <Col sm={10}>
                      <Input 
                        type='textarea'
                        name='description_company' 
                        onChange={this.handleDecChange}
                        placeholder='Enter description of Company'
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="logo" sm={2}>File</Label>
                    <Col sm={10}>
                      <Input 
                        type="file" 
                        name="logo" 
                        onChange={this.handleLogoChange}
                        id="logo"
                      />
                      <FormText color="muted">
                        Images must be in ext (.jpg/.jpeg/.png) and max 1MB.
                      </FormText>
                    </Col>
                  </FormGroup>
              </ModalBody>
              <ModalFooter>
                <Button type='submit' color='primary' onClick={this.toggleAdd}>Save</Button>{' '}
                <Button color='secondary' onClick={this.toggleAdd}>No</Button>
              </ModalFooter>
                </Form>
            </Modal>
            
            <Table hover responsive className='tableCompany'>
              <thead>
                <tr>
                  <th>Logo</th>
                  <th>ID Company</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Action</th>
                </tr>
              </thead>
                  {!this.props.company.isLoading&&!this.props.company.isError&&
                <React.Fragment>
                  {this.props.company.data.map((v,i)=>(
                  
              <tbody >
                <tr key={i.toString()} >
                  <td className='align-middle'>
                    <img src={v.logo} className='logoComp' alt='Company Logo'/>
                  </td>
                  <td className='align-middle'>{v.id_company}</td>
                  <td className='align-middle'>{v.name_company}</td>
                  <td className='align-middle'>{v.description_company.substr(0,50)}...</td>
                  <td className='actionCompany'>
                    {/* View Company */}
                    <button type="button" className="btn btn-primary" >
                      <span><FontAwesomeIcon icon={faBullseye}/></span> 
                    </button>&nbsp;&nbsp;
                  {/* Updated Company */}
                    <button type="button" className="btn btn-warning" data-toggle="modal" data-target= {'#bbb'+v.id_company}>
                      <span><FontAwesomeIcon icon={faEdit}/></span> 
                    </button>&nbsp;&nbsp;
                    {/* Modal Update */}
                    <div className="modal fade" id={'bbb'+v.id_company} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                      <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Update Company (Update soon. Can't Work. Ty)</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          <Form >
                          <div class="modal-body">
                            <FormGroup row>
                              <Label sm={2}>Name</Label>
                              <>{this.state.id_company}</>
                              <Col sm={10}>
                                <Input
                                  type='text'
                                  name='name_company'
                                  onChange={this.handleNameChange}
                                  defaultValue={v.name_company}
                                  placeholder='Enter name of Company' 
                                />
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Label sm={2}>Description</Label>
                              <Col sm={10}>
                                <Input
                                  type='textarea'
                                  name='description_company' 
                                  onChange={this.handleDecChange}
                                  defaultValue={v.description_company}
                                />
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Label for="logo" sm={2}>
                                File
                              </Label>
                              <Col sm={10}>
                                <Input
                                  type="file"
                                  name="logo"
                                  onChange={this.handleLogoChange}
                                />
                                <FormText color="muted">
                                  Images must be in ext (.jpg/.jpeg/.png) and max 1MB.
                                </FormText>
                              </Col>
                            </FormGroup>  
                          </div>
                          <div class="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-warning" data-dismiss="modal" onClick={(event) => this.handleSubmitUpdate(v.id_company, event)} disabled>Save changes</button>
                          </div>
                          </Form>
                        </div>
                      </div>
                    </div>
                      

                    {/* Delete item  */}
                    <button type="button" className="btn btn-danger" data-toggle="modal" data-target= {'#aaa'+v.id_company}>
                      <span><FontAwesomeIcon icon={faTrash}/></span>
                    </button>

                    {/* Modal Delete */}
                    <div className="modal fade" id={'aaa'+v.id_company} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                            <button type="button" className="btn btn-danger" onClick={()=>this.handleSubmitDelete(v.id_company)} data-dismiss="modal">Delete</button>
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
      
          {/* /.row */}
    </div>{/* /.container-fluid */}
  </section>
  {/* /.content */}
</div>

    )
  }
}

const Styled = styled.div`
  .actionCompany {
    display: flex;
    margin-top: 30px;
    border-top: 0;
  }
  .cardCompany {
    display: inline-block;
    margin: 0 auto;
    padding: 20px;
    width: 100%;
  }
  .tableCompany {
    margin-bottom: 0;
  }
  .logoComp {
    height: 100px;
    width: 100px; 

  }
`;

const mapStateProps = state => ({
  company: state.company
})

export default connect(mapStateProps)(ContentCompany);
