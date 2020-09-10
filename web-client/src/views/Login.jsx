import React, { Component } from "react";
import { FormInputs } from 'components/FormInputs/FormInputs.jsx'
import Button from 'components/CustomButton/CustomButton';
import { Grid, Row, Col, FormGroup, ControlLabel, FormControl } from "react-bootstrap";
import { Card } from "components/Card/Card.jsx";
import NotificationSystem from 'react-notification-system';
import { style } from "variables/Variables.jsx";
import { Redirect } from 'react-router-dom';
import { server_urls } from '../config';

export default class Login extends Component {

    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this);

        this.state = {
            email: '',
            password: '',
            hospital: '',
            radioHospital: "1",
            _notificationSystem: this.refs.notificationSystem
        }
    }

    handleClick(position) {
        var level = 'error'; // 'success', 'warning', 'error' or 'info'
        this.state._notificationSystem.addNotification({
            title: (<span data-notify="icon" className="pe-7s-gift"></span>),
            message: (
                <div>
                    Welcome to <b>Light Bootstrap Dashboard</b> - a beautiful freebie for every web developer.
                </div>
            ),
            level: level,
            position: position,
            autoDismiss: 15,
        });
    }

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

    changeHospitalHandler = e => {
        this.setState({
            hospital: e.target.value
        });
    }

    login = () => {
        const user = {
            email: this.state.email,
            password: this.state.password
        };

        const url = this.state.hospital;

        fetch(url + '/login', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: { 'Content-Type': 'application/json' },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(user)
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Something went wrong');
                }
            })
            .then((responseJson) => {
                localStorage.setItem('token', responseJson.accessToken);
                localStorage.setItem('url', url);
                console.log(localStorage.getItem('token'));
                window.location.href = "admin/accounts";
            })
            .catch((error) => {
                this.handleClick.bind(this, 'tc')
                console.log('error')
            });
    }

    handleErrors(response) {
        if (!response.ok) {
            this.handleClick.bind(this, 'tc')
            throw Error(response.statusText);
        }
        return response;
    }

    render() {
        if (localStorage.getItem('token') !== null)
            return <Redirect to='/admin/accounts' />
        return (
            <Grid fluid
                style={{
                    position: 'absolute', left: '50%', top: '50%',
                    transform: 'translate(-50%, -50%)'
                }}>
                <NotificationSystem ref="notificationSystem" style={style} />
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
                                            <FormGroup controlId="formControlsSelect">
                                                <ControlLabel>Select</ControlLabel>
                                                <FormControl componentClass="select" placeholder="select" onChange={this.changeHospitalHandler}>
                                                    {server_urls.map((element, key) => {
                                                        return (<option key={key} value={element.value}>{element.label}</option>)
                                                    })}
                                                </FormControl>
                                            </FormGroup>
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
                                                //defaultValue: "jb@gmail.com",
                                                onChange: this.changeEmailHandler
                                            },
                                            {
                                                label: "Password",
                                                type: "password",
                                                bsClass: "form-control",
                                                placeholder: "**********",
                                                //defaultValue: "password",
                                                onChange: this.changePasswordHandler
                                            }
                                        ]}
                                    >
                                    </FormInputs>
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