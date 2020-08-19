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
import { isTypeQueryNode } from "typescript";

class PersonalInfoList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      recordCount: 0,
      records: [],
    }
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    this.setState({ account: id }, () => this.loadBlockchainData())
  }

  async loadBlockchainData() {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545")

    const infoList = new web3.eth.Contract(PERSONAL_INFO_ABI, PERSONAL_INFO_ADDRESS);
    this.setState({ infoList })

    const recordCount = await infoList.methods.recordCount().call()
    this.setState({ recordCount })

    for (var i = 1; i <= recordCount; i++) {
      const record = await infoList.methods.records(i).call()
      if (this.checkAccount(record['owner'])) {
        this.setState({
          records: [...this.state.records, record]
        })
      } else {
        continue;
      }
    }
  }

  checkAccount(currentAccount) {
    const { account } = this.state;
    console.log("Account:" + account);
    console.log("Current account: " + currentAccount);
    if (account == '' || account == undefined) return true;
    else if (account == currentAccount) return true;
    else return false;
  }

  formatTimestamp(timestamp) {
    var date = new Date(timestamp * 1000);
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var seconds = "0" + date.getSeconds();
    var year = date.getFullYear();
    var month = "0" + (date.getMonth() + 1);
    var day = "0" + date.getDate();

    var formattedTime = year + '/' + month.substr(-2) + '/' + day.substr(-2) + ' - ' + hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    return formattedTime;
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
                        <th>Timestamp</th>
                        <th>SpO2</th>
                        <th>Heart rate</th>
                        <th>Owner</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        records.map((element, key) => {
                          return (
                            <tr key={key}>
                              <td>{element.id}</td>
                              <td>{this.formatTimestamp(element.timestamp)}</td>
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
