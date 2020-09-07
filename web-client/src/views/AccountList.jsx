/*!

=========================================================
* Light Bootstrap Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import { Grid, Row, Col, Table } from "react-bootstrap";
import Card from "components/Card/Card.jsx";
import Button from 'components/CustomButton/CustomButton';
import { PATIENTS } from '../config';

class AccountList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      patients: []
    }
  }

  componentWillMount() {
    this.loadPatient();
  }

  loadPatient = () => {

    const url_server = "https://localhost:3000/listPatients";

    fetch(url_server, {
      method: 'GET',
      headers: new Headers({
        'Authorization': 'Bearer ' + localStorage.getItem("token"),
      }),
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      redirect: 'follow',
      referrerPolicy: 'no-referrer'
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Something went wrong');
        }
      })
      .then((responseJson) => {
        this.setState({
          patients: responseJson.patients
        })
      })
      .catch((error) => {
        console.log("Error: " + error);
      });
  }

  onClickAccount = (element, name) => {
    window.location.href = "personal-info/" + element + "/" + name;
  }

  onClickAddNewPatient = () => {
    window.location.href = "add-patient";
  }

  render() {

    if (localStorage.getItem('token') === null)
      return <Redirect to='/login' />

    const {
      patients
    } = this.state

    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="Patients List"
                category="Here is a list of your patients"
                ctTableFullWidth
                ctTableResponsive
                content={
                  <div>
                    <Button bsStyle="info" pullRight fill onClick={this.onClickAddNewPatient}>Add a new patient</Button>
                    <Table striped hover>
                      <thead>
                        <tr>
                          <th>NAME</th>
                          <th>EMAIL</th>
                          <th>BLOCKCHAIN ADDRESS</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          patients.map((element, key) => {
                            return (
                              <tr key={key}>
                                <td>{element.name}</td>
                                <td>{element.email}</td>
                                <td>{element.publicKey}</td>
                                <td onClick={() => this.onClickAccount(element.publicKey, element.name)}><i className="pe-7s-angle-right-circle"></i></td>
                              </tr>
                            )
                          })
                        }
                      </tbody>
                    </Table>
                  </div>
                }
              />
            </Col>

          </Row>
        </Grid>
      </div>
    );
  }
}

export default AccountList;
