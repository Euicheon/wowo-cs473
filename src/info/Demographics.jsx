import React, { Component } from 'react'
import {Row, Col} from 'react-materialize';
import './infoPage.css'

export class Demographic extends Component {

  render() {
      return (
          <div className="DemographicContainer">
              <Row className="DemographicRow" style={{paddingTop: '15px', paddingBottom: '15px'}}>
                  <Col className="DemographicCol" s={5}>
                      <div className="ProfileImage" alt="logo" style={{backgroundImage: 'url('+this.props.ImageURL+')'}}></div>
                  </Col>
                  <Col className="DemographicCol" s={7}>
                      <div className="ProfileTextWrapper">
                          <div className="ProfileText">
                              <span> Name: {this.props.Name}</span>
                              <br/>
                              <span> email: {this.props.email}</span>
                              <br/>
                              <span> Crew: {this.props.Crew}</span>
                              <br/>
                              <span> Points: {this.props.Points}</span>
                              <br/>
                              <span> Age: {this.props.Age}</span>
                          </div>
                      </div>
                  </Col>
              </Row>
          </div>
      )
  }
}

export default Demographic;