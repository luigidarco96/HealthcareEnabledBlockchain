import React, { Component } from "react";
import { FormInputs } from 'components/FormInputs/FormInputs.jsx'
import Button from 'components/CustomButton/CustomButton';
import { Grid, Row, Col, Label } from "react-bootstrap";
import { Card } from "components/Card/Card.jsx";
import axios from 'axios';

import Select from 'react-select';

const options = [
    { value: 'https://localhost:3000', label: 'St. John Hospital' },
    { value: '*', label: 'McLean Hospital' },
    { value: '*', label: 'Beverly Hospital' }
]

export default class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            email: 'jb@gmail.com',
            password: 'password',
            hospital: '',
        }
    }

    componentWillMount() { }

    changeEmailHandler = event => {
        this.setState({
            email: event.target.value
        });
    }

    changePasswordHandler = event => {
        this.setState({
            password: event.target.value
        });
    }

    changeHospitalHandler = event => {
        this.setState({
            hospital: event.value
        });
    }

    postData = async (url = '', data = {}) => {
        const response = await fetch(url, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(data)
        });
        return response;
    }

    login = (params) => {
        const user = {
            email: this.state.email,
            password: this.state.password
        };
        console.log(user);
        /*axios.post(`https://localhost:3000/login`, {user}).then(res => {
            console.log(res)
        })*/

        /*this.postData('https://localhost:3000/login', user)
            .then((response) => {
            if (response.ok) {
                console.log(response.json());
            } else {
                throw new Error('Something went wrong');
            }
        }).then(res => {
            console.log(res)
        })*/

        fetch('https://localhost:3000/login', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {'Content-Type': 'application/json'},
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(user)})
            .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Something went wrong');
            }
        })
        .then((responseJson) => {
            console.log(responseJson)
        })
        .catch((error) => {
            console.log('error')
        });
    }

    handleErrors(response) {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response;
    }

    render() {
        return (
            <Grid fluid
                style={{
                    position: 'absolute', left: '50%', top: '50%',
                    transform: 'translate(-50%, -50%)'
                }}>
                <Row>
                    <Col md={12}>
                        <Card
                            statsIcon="fa fa-history"
                            id="login"
                            title="Login"
                            stats="Login to access to patients' data"
                            content={
                                <Col md={12}>
                                    <Row>
                                        <Col md={12}>
                                            <Label>Select Hospital</Label>
                                            <Select options={options} onChange={this.changeHospitalHandler} />
                                        </Col>
                                    </Row>
                                    <FormInputs
                                        ncols={["col-md-6", "col-md-6"]}
                                        properties={[
                                            {
                                                label: "Email",
                                                type: "email",
                                                bsClass: "form-control",
                                                placeholder: "email",
                                                defaultValue: "jb@gmail.com",
                                                onChange: this.changeEmailHandler
                                            },
                                            {
                                                label: "Password",
                                                type: "password",
                                                bsClass: "form-control",
                                                placeholder: "**********",
                                                defaultValue: "password",
                                                onChange: this.changePasswordHandler
                                            }
                                        ]}
                                    />
                                    <Button bsStyle="primary" pullRight onClick={this.login}>Login</Button>
                                </Col>
                            }
                        />
                    </Col>
                </Row>
            </Grid>
        );
    }
}