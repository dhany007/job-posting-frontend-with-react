import React, { Component } from 'react'
import axios from 'axios'
import {
  Row, Col, Container, Button, UncontrolledCollapse,
  Card, CardTitle, CardText
} from 'reactstrap'

import { Link } from 'react-router-dom'
import styled from 'styled-components'


export default class DetailJob extends Component {
  constructor(props){
    super(props)
    this.state = {
      id_job: this.props.match.params.id_job,
      data: {}
    }
  }
  
  componentDidMount(){
    const {id_job} = this.props.match.params
    axios.get('http://localhost:3001/job/'+id_job).then(res=>{
      this.setState({
        data:res.data.result[0]
      })
    })
  }

  render() {
    return (
      <div>
        {!this.state.data.id_job&&(
          <React.Fragment>
            Loading...
          </React.Fragment>
        )}
        {this.state.data.id_job&&(
          <React.Fragment>
            Succes...
          </React.Fragment>
        )

        }
      </div>
    )
  }
}
