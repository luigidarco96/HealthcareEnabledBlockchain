import { Component } from "react";

export default class SignOut extends Component {

    componentWillMount() {
        localStorage.removeItem("token");
        window.location.href = "/"
    }

    render() {
        return ("Goodbye!")
    }
}