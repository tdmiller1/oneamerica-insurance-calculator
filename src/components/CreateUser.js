import React, {Component} from 'react'
import { withRouter } from "react-router";
import logo from "../assets/images/oneamerica_logo.png"
import "../assets/login.css"
import axios from "axios";

class CreateUser extends Component {

    constructor(props){
        super(props)
        this.state = {
            username:"",
            password:"",
            confirm:"",
            isValid:true,
            success:false,
            isCreated:false,
            isSameUserName:false,
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

    createUserButton = _ => {
        var url = this.state.host + '/users/add'
        axios.post(url, {
            username: this.state.username,
            password: this.state.password
        }).then(response => {
            switch(response.status){
                case 200:
                    this.props.history.push('/login')
                    break;
                default:
                    this.setState({sucess: false})
            }
        })
    }
    
    authenticate = _ => {
        var url = this.state.host + '/users/username'
        axios.get(url,{
            params:{
                username:this.state.username
            }
        }).then(response => {
            console.log(response.data.data)
            if(response.data.data[0]){
                this.setState({isSameUserName: true})
            }else{
                this.createUserButton();
            }
        })
        if(this.state.success === true){
            this.props.history.push('/login')
        }
    }

    render(){

        return (
            <div>
                <div id="body">
                    <div id="login_fields">
                        <img id="logo" src={logo} alt="OneAmerica Logo" title="Barclay's Logo" />
                        <h4>Admin Panel Login</h4>
                        <div id="login-page-vspacer"></div>
                        {
                                this.state.isSameUserName &&
                                <div>
                                    This username is already used.
                                </div>
                            }
                            {
                                !this.state.isValid &&
                                <div>
                                    Your passwords do not match.
                                </div>
                            }
                        <div id="login-page-input">
                            <div id="textleft">
                                <label>New Username</label>
                            </div>
                            <input className="login-input" type="text" name="password" onChange={(e) => {
                                this.setState({
                                    username: e.target.value
                                    })
                                }}/><br/>
                            <div id="textleft">
                                <label>New Password</label>
                            </div>
                            <input className="login-input" type="password" name="password"
                            onChange={(e) => {
                                this.setState({
                                    password: e.target.value
                                    })
                                }}></input>
                            <div id="textleft">
                                <label>Confirm Password</label>
                            </div>
                            <input className="login-input" type="password" name="password" 
                            onKeyPress={(e) => { 
                                if(e.key === 'Enter'){
                                    this.createUserButton();
                                }}}
                            onChange={(e) => {
                                this.setState({
                                    confirm: e.target.value
                                    })
                                }}/>
                            <div id="login_button">
                                <input 
                                    type="button" 
                                    id="loginbutton" 
                                    onClick={ () => {
                                        if(this.state.confirm === this.state.password){
                                            this.setState({isValid: true})
                                            this.authenticate()
                                        }
                                        else{
                                            this.setState({isValid: false})
                                        }
                                    }}
                                        
                                    value="Create User" 
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )

    }

}

export default withRouter(CreateUser)