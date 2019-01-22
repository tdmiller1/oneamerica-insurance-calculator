import React, {Component} from 'react'
import { withRouter } from "react-router";
import PropTypes from "prop-types";
import ClientCard from "./ClientCard";

class Dashbard extends Component {

    state = {}

    render() {
        
        return (
             <div>
                
                <div>
                    <h3>Filters</h3>
                    <a href="#" >Link 1</a><br></br>
                    <a href="#" >Link 2</a><br></br>
                    <a href="#" >Link 3</a><br></br>
                </div>

                <div>

                    <div>
                        <h1>Dashboard</h1>
                    </div>

                    <ClientCard name="Timmy" phone="555-555-5555"></ClientCard>
                    <ClientCard name="Debby" phone="555-555-5555"></ClientCard>
                    <ClientCard name="Bobby" phone="555-555-5555"></ClientCard>
                    <ClientCard name="Davey" phone="555-555-5555"></ClientCard>
                    <ClientCard name="Joshy" phone="555-555-5555"></ClientCard>


                </div>
            </div>
        )
    }

}

export default withRouter(Dashbard)