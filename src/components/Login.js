import React, {Component} from 'react'
import { withRouter } from "react-router";
import Dashboard from "./Dashboard";
import logo from "../assets/images/oneamerica_logo.png"
import "../assets/login.css"


class Login extends Component {

    state = {
        email:"",
        password:"",
        login:{},
        isAuthenticated:false
    }

    loginButton = _ => {

        fetch(`http://localhost:4000/username?username=${this.state.email}`)
        .then(response => response.json())
        .then(response => {
            // this.state.setState({login:response.data})
            console.log(response.data[0])
        })
        .catch(err => {
            this.setState({failure: true})
        })
        
        if(this.state.email == "test@gmdail.com" && this.state.password== "1234"){
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
                                <h4 id="login-page-create-user" onClick={this.createNewUser()}>Create New User</h4>
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