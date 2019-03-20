import React, {Component} from 'react'
import { withRouter } from "react-router";
import logo from "../assets/images/oneamerica_logo.png"
import "../assets/login.css"
import axios from "axios";

class Login extends Component {

    constructor(props){
        super(props)
        this.state = {
            email:"",
            password:"",
            attempt:{},
            isAuthenticated:true,
            host:null
        }
    }

    componentWillMount(){
        if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
            this.setState({host: "http://localhost:4000"})
        } else {
            this.setState({host: "https://oneamerica-nodemon.herokuapp.com"})
        }
    }

    loginButton = _ => {
        var url = this.state.host + '/users/username'
        axios.get(url,{
            params:{
                username:this.state.email
            }
        }).then(response => {
            console.log(response.data.data)
            if(response.data.data[0]){
                this.setState({ attempt: response.data.data[0] })
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
                <div id="body">
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
                            <input className="login-input" type="text" name="password" onChange={(e) => {
                                this.setState({
                                    email: e.target.value,
                                    isAuthenticated: true
                                    })
                                }}/><br/>
                            <div id="textleft">
                                <label>Password</label>
                            </div>
                            <input className="login-input" type="password" name="password" 
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
                            <h4 id="login-page-create-user" onClick={() => this.props.history.push('/createuser')}>Create New User</h4>
                        </div>
                    </div>
                </div>
            </div>
        )

    }

}

export default withRouter(Login)