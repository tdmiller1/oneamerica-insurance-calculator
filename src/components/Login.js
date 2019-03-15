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
            this.setState({host: "https://oneamerica-nodemon.herokuapp.com"})
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
        // console.log("TEST")
        // axios.post('http://localhost:3000/customer/add',{
        //     name:"tucker",
        //     email:"tuck@gmail.com",
        //     phone_number:"Test",
        //     location:"IND",
        //     einsurance:12300,
        //     time:null
        // })
        // axios({
        //     method:'delete',
        //     url:'http://localhost:3000/customer/',
        //     data: {
        //         name:"tucker",
        //         email:"tuck@gmail.com"
        //     }
        // })
        axios.get('http://localhost:4000/customers')
        axios.get('http://localhost:4000/customers/search',{
            params:{
                name:"Adela"
            }
        })
        // axios.get('http://localhost:4000/filter/location',{
        //     params:{
        //         region:"midwest"
        //     }
        // })
        // axios.get('http://localhost:4000/filter/einsurance',{
        //     params:{
        //         upper:100000,
        //         lower:90000
        //     }
        // })
        // axios.get('http://localhost:4000/filter/timestamp',{
        //     params:{
        //         upper:'2019-02-02',
        //         lower:'2018-02-02'
        //     }
        // })
        axios.get('http://localhost:4000/users/username',{
            params:{
                username:'david'
            }
        })
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
                                <h4 id="login-page-create-user" onClick={() => this.createNewUser()}>Create New User</h4>
                            </div>
                        </div>
                </body>
            </div>
        )

    }

}

export default withRouter(Login)