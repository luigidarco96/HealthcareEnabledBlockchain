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
import Web3 from 'web3';
import { Grid, Row, Col, Table } from "react-bootstrap";
import Card from "components/Card/Card.jsx";
import { PATIENTS } from '../config';

class AccountList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      accounts: []
    }
  }

  componentWillMount() {
    //this.setState({accounts: PATIENTS})
    // this.loadBlockchainData();
  }

  /*
  async loadBlockchainData() {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545")
    const accounts = await web3.eth.getAccounts()
    this.setState({accounts: accounts})
  }
  */

  onClickAccount = (element) => {
    window.location.href = "personal-info/" + element;
  }

  render() {

    const {
      accounts
    } = this.state

    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="Account List"
                category="Here is a list of accounts signed up on the blockchain"
                ctTableFullWidth
                ctTableResponsive
                content={
                  <Table striped hover>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>SURNAME</th>
                        <th>PUBLIC KEY</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        PATIENTS.map((element, key) => {
                          return(
                            <tr key={key}>
                              <td>{key}</td>
                              <td>{element.name}</td>
                              <td>{element.surname}</td>
                              <td>{element.public_key}</td>
                              <td onClick={() => this.onClickAccount(element.public_key)}>go to personal info</td>
                            </tr>
                          )
                        })
                      }
                    </tbody>
                  </Table>
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
