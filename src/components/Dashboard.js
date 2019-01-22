import React, {Component} from 'react'
import { withRouter } from "react-router";
import PropTypes from "prop-types";

class Dashbard extends Component {

    state = {}

    render() {
        
        return (
            <div className="temporary-site-wrapper">
                <div id="buffer">
                    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"></link>
                    <div class="w3-sidebar w3-light-grey w3-bar-block" className="width25">
                        <h3 class="w3-bar-item">Filters</h3>
                        <a href="#" class="w3-bar-item w3-button">Link 1</a><br></br>
                        <a href="#" class="w3-bar-item w3-button">Link 2</a><br></br>
                        <a href="#" class="w3-bar-item w3-button">Link 3</a><br></br>
                    </div>

                    <div className="marginL25">

                        <div class="w3-container">
                            <h1>My Page</h1>
                        </div>

                        <div class="w3-container">
                            <h2>Sidebar Navigation Example</h2>
                            <p>The sidebar with is set with "style="width:25%".</p>
                            <p>The left margin of the page content is set to the same value.</p>
                        </div>

                    </div>
                </div>
            </div>
        )
    }

}

export default withRouter(Dashbard)