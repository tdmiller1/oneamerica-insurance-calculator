import React, {Component} from 'react'
import { withRouter } from "react-router";
import logo from "../assets/images/oneamerica_logo.png"
import "../assets/login.css"


class Login extends Component {

    constructor(props){
        super(props)
        this.state = {
            email:"",
            password:"",
            attempt:{},
            isAuthenticated:true
        }
    }

    loginButton = _ => {

        fetch(`http://localhost:4000/username?username=${this.state.email}`)
        .then(response => response.json())
        .then(response => {
            if(response.data[0]){
                this.setState({ attempt: response.data[0] })
                this.authenticate();
            }else{
                this.setState({ isAuthenticated: false});
            }
        })
    }
    
    authenticate = _ => {
        if(this.state.password === this.state.attempt.password){
            this.props.history.push('/dashboard')
        }else{
            this.setState({ isAuthenticated: false })
        }
    }

    createNewUser = _ => {

    }

    render(){

        return (
            <div>
                <body id="body">
                        <div id="login_fields">
                            <img id="logo" src={logo} alt="OneAmerica Logo" title="Barclay's Logo" />
                            <h4>Admin Panel Login</h4>
                            <div id="login-page-vspacer"></div>
                            <div id="login-page-input">
                                {
                                    !this.state.isAuthenticated &&
                                    <div>
                                        Wrong password or username
                                    </div>
                                }
                                <div id="textleft">
                                    <label>Username</label>
                                </div>
                                <input id="input" type="text" name="password" onChange={(e) => {
                                    this.setState({
                                        email: e.target.value,
                                        isAuthenticated: true
                                        })
                                    }}/><br/>
                                <div id="textleft">
                                    <label>Password</label>
                                </div>
                                <input id="input" type="password" name="password" 
                                onKeyPress={(e) => { 
                                    if(e.key === 'Enter'){
                                        this.loginButton();
                                    }}}
                                onChange={(e) => {
                                    this.setState({
                                        password: e.target.value,
                                        isAuthenticated: true
                                        })
                                    }}/>
                                <div id="login_button">
                                    <input 
                                        type="button" 
                                        id="loginbutton" 
                                        onClick={this.loginButton}
                                        value="Login" 
                                    />
                                </div>
                                <h4 id="login-page-create-user" onClick={this.createNewUser()}>Create New User</h4>
                            </div>
                        </div>
                </body>
            </div>
        )

    }

}

export default withRouter(Login)