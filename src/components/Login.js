import React, { Component } from "react";
import { FormGroup, FormControl, FormLabel, Button } from "react-bootstrap";
import { Auth } from "aws-amplify";

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        };
    }
 
    validateForm() {
        return this.state.email.length > 0 && this.state.password.length>0;
    }
 
    handleChange = event => {
        this.setState({
                [event.target.id]: event.target.value
            });
    }
 
    handleSubmit = async event => {
        event.preventDefault();
        try {
            await Auth.signIn(this.state.email, this.state.password);
            this.props.userHasAuthenticated(true);
            this.props.history.push("/lucky");
        } catch (e) {
            alert(e.message);
        }
       
    }
 
    render() {
        return (
            <div className="Home">
                <div className="col-md-4">
                    <h2>Login</h2>
                    <form onSubmit={this.handleSubmit}>
                        <FormGroup controlId="email">
                            <FormLabel>Email</FormLabel>
                            <FormControl
                                autoFocus
                                type="email"
                                value={this.state.email}
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                        <FormGroup controlId="password" >
                            <FormLabel>Password</FormLabel>
                            <FormControl
                                value={this.state.password}
                                onChange={this.handleChange}
                                type="password"
                            />
                        </FormGroup>
                        <Button type="submit">
                            Login
                        </Button>
                    </form>
                </div>
            </div>
        );
    }
 }