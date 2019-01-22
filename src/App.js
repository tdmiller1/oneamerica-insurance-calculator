import React, { Component } from 'react';
import './assets/style.css';
import './assets/dashboard.css';
import { withRouter, Switch, Route } from "react-router";
import Home from "./components/Home"
import Results from "./components/Results"
import Dashboard from './components/Dashboard';

class App extends Component {

    render() {
        return (
            <div className="App">
                <switch>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/results" component={Results}/>
                    <Route exact path="/dashboard" component={Dashboard}/>
                </switch>
            </div>
            );
            }
}

export default withRouter(App);