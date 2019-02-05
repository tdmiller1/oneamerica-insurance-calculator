import React, {Component} from 'react'
import { withRouter } from "react-router";
import Dashboard from "./Dashboard";
import logo from "../assets/images/oneamerica_logo.png"
import "../assets/login.css"


class Login extends Component {

    state = {
        email:"",
        password:"",
        isAuthenticated:false
    }

    loginButton = _ => {
        if(this.state.email == "test@gmail.com" && this.state.password== "1234"){
        this.setState({
            email:"",password:""
        }
        , () => {
            this.props.history.push({
                pathname: '/dashboard',
                isAuthenticated:true,
                state: {
                    isAuthenticated:true
                }
            })
        })
    }else{
        console.log("Wrong password")
    }
    }
    render(){

        return (
            <div>
                <body id="body">
                        <div id="login_fields">
                            <img id="logo" src={logo} alt="Barclay's Logo" title="Barclay's Logo" />
                            <h4>Admin Panel Login</h4>

                            <div id="login-page-input">
                                <div id="textleft">
                                    <label>Username</label>
                                </div>
                                <input id="input" type="text" name="password" onChange={(e) => {
                                    this.setState({
                                        email: e.target.value
                                        })
                                    }}/><br/>
                                <div id="textleft">
                                    <label>Password</label>
                                </div>
                                <input id="input" type="password" name="password" onChange={(e) => {
                                    this.setState({
                                        password: e.target.value
                                        })
                                    }}/>
                                <div id="login_button">
                                    <input type="button" id="loginbutton" onClick={this.loginButton} value="Login" />
                                </div>
                                <h4>Create New User</h4>
                            </div>
                        </div>
                        <div>
                            <p id="copyright">Copyright &copy; DTM Sports</p>
                        </div>
                </body>
            </div>
        )

    }

}

export default withRouter(Login)