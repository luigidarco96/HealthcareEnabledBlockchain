import { Component } from "react";

export default class SignOut extends Component {

    componentWillMount() {
        localStorage.removeItem("token");
        localStorage.removeItem("url");
        window.location.href = "/"
    }

    render() {
        return ("Goodbye!")
    }
}