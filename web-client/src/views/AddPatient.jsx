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
import {
  Grid,
  Row,
  Col
} from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import Button from "components/CustomButton/CustomButton.jsx";

class UserProfile extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      address: "",
    }
  }

  onChangeName = (event) => {
    this.setState({
      name: event.target.value
    })
  }

  onChangeEmail = (event) => {
    this.setState({
      email: event.target.value
    })
  }

  onChangeAddress = (event) => {
    this.setState({
      address: event.target.value
    })
  }

  onSubmit = (event) => {
    event.preventDefault();

    const url_server = localStorage.getItem('url') + '/addPatient';

    console.log(url_server);

    fetch(url_server, {
      method: 'POST',
      headers: new Headers({
        'Authorization': 'Bearer ' + localStorage.getItem("token"),
        'Content-Type': 'application/json'
      }),
      mode: 'cors',
      //cache: 'no-cache',
      //credentials: 'same-origin',
      //redirect: 'follow',
      //referrerPolicy: 'no-referrer',
      body: JSON.stringify({
        name: this.state.name,
        email: this.state.email,
        publicKey: this.state.address
      })
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Something went wrong');
        }
      })
      .then((responseJson) => {
        console.log(responseJson)
        window.location.href = "/accounts"
      })
      .catch((error) => {
        console.log("Error: " + error);
        window.location.href = "/accounts"
      });
  }

  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="Add a new patient"
                content={
                  <form onSubmit={this.onSubmit}>
                    <FormInputs
                      ncols={["col-md-6", "col-md-6"]}
                      properties={[
                        {
                          label: "Name",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Name and Surname",
                          defaultValue: "",
                          onChange: this.onChangeName
                        },
                        {
                          label: "Email address",
                          type: "email",
                          bsClass: "form-control",
                          placeholder: "Email",
                          onChange: this.onChangeEmail
                        }
                      ]}
                    />
                    <FormInputs
                      ncols={["col-md-12"]}
                      properties={[
                        {
                          label: "Blockchain Address",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "0x90F8b...",
                          defaultValue: "",
                          onChange: this.onChangeAddress
                        }
                      ]}
                    />
                    <Button bsStyle="info" pullRight fill type="submit">
                      Save patient
                    </Button>
                    <div className="clearfix" />
                  </form>
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default UserProfile;
