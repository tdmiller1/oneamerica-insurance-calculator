import React, { Component } from 'react';
// import './assets/style.css';
import { withRouter, Switch, Route } from "react-router";
import Home from "./components/Home"
import Results from "./components/Results"
import Login from "./components/Login"
import Dashboard from './components/Dashboard';

class App extends Component {

    render() {
        return (
            <div className="App">
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/results" component={Results}/>
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/dashboard" component={Dashboard}/>
                </Switch>
            </div>
            );
            }
}

export default withRouter(App);