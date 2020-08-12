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
import { PERSONAL_INFO_ADDRESS, PERSONAL_INFO_ABI } from '../config';
import Card from "components/Card/Card.jsx";

class PersonalInfoList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      recordCount: 0,
      records: [],
    }
  }

  componentWillMount() {
    this.loadBlockchainData();
  }

  async loadBlockchainData() {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545")
    const accounts = await web3.eth.getAccounts()
    this.setState({ accounts: accounts })

    const infoList = new web3.eth.Contract(PERSONAL_INFO_ABI, PERSONAL_INFO_ADDRESS);
    this.setState({ infoList })

    const recordCount = await infoList.methods.recordCount().call()
    this.setState({ recordCount })

    for (var i = 1; i <= recordCount; i++) {
      const record = await infoList.methods.records(i).call()
      this.setState({
        records: [...this.state.records, record]
      })
    }
  }

  render() {

    const {
      records
    } = this.state

    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="Personal Info List"
                category="Here is a list of personal info saved on the blockchain"
                ctTableFullWidth
                ctTableResponsive
                content={
                  <Table striped hover>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>SpO2</th>
                        <th>Heart rate</th>
                        <th>Owner</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        records.map((element, key) => {
                          console.log(element);
                          return (
                            <tr key={key}>
                              <td>{element.id}</td>
                              <td>{element.SpO2}</td>
                              <td>{element.HR}</td>
                              <td>{element.owner}</td>
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

export default PersonalInfoList;
