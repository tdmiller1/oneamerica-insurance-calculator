import React, {Component} from 'react'
import { withRouter } from "react-router";
import PropTypes from "prop-types";

class Results extends Component {

    state = {
        customer: {
            full_name: undefined,
            email: undefined,
            phone_number: undefined,
            location: undefined,
            einsurance: 1
        }
    }

    addCustomer = _ =>{
        const { customer } = this.state;
        fetch(`http://10.12.18.10:4000/customers/add?full_name=${customer.full_name}&email=${customer.email}&phone_number=${customer.phone_number}&location=${customer.location}&einsurance=${this.props.location.state.amount.slice(1)}`)
        .then(response => {
            switch(response.status){
                case 200: 
                    alert("Successfully submitted your information.")
                    break;
                case 400: 
                    alert("Bad Request");
                    break;
                case 404: 
                    alert("Not Found");
                    break;
            }
        })    
        .catch(err => console.error(err))
      }

    render() {
        const { customer } = this.state;
        return (
            <div id="results-page">
                <h3 id="calculator-title">LIFE INSURANCE CALCULATOR</h3>

                <div className="overview-text">
                    <h1>Lorem Ipsum Dolor Sit At, Consectetur Elit?</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
                </div>
            
                <form className="component" onSubmit={(e) => {
                    console.log(this.state.customer);
                    e.preventDefault();
                    this.addCustomer();
                }}>


                    <div className="results-information overview-text results-margin">
                        <h1>Generic Information You May Need</h1>

                        <div className="results-info-list">
                            {
                                this.props.location.state &&
                                <ol>
                                    <li>Type of insurance: {this.props.location.state.type}</li>
                                    <li>Amount of insurance: {this.props.location.state.amount}</li>
                                    <li>Cost of insurance per month: {this.props.location.state.cost}</li>
                                    <li>Type of plan: {this.props.location.state.plan}</li>
                                </ol>
                            }
                            {
                                !this.props.location.state &&
                                <div>
                                    <h3>Oops!</h3>
                                    <p>It looks like you made it to this page without fillout out our form.
                                        Go back to the OneAmerica Life Insurance Calculator form to see more.</p>
                                </div>
                            }
                        </div>
                    </div>

                    <div className="contact-us">
                        <div className="contact-us-wrapper results">
                                <div className="input-wrapper">
                                    <div className="label-input">
                                        <label htmlFor="full-name">Full Name</label>
                                        <input required name="full_name" placeholder="Jane Doe" type="text"  onChange={(e) => {
                                            this.setState({customer: {...customer, full_name: e.target.value }})
                                        }}/>
                                    </div>

                                    <div className="label-input">
                                        <label htmlFor="email">Email</label>
                                        <input name="email" placeholder="JaneDoe@email.com" type="email"  onChange={(e) => {
                                            this.setState({customer: {...customer, email: e.target.value }})
                                        }}/>
                                    </div>
                                </div>

                                <div className="input-wrapper">
                                    <div className="label-input">
                                        <label htmlFor="phone">Phone</label>
                                        <input required name="phone_number" placeholder="555-555-5555" type="text"  onChange={(e) => {
                                            this.setState({customer: {...customer, phone_number: e.target.value }})
                                        }}/>
                                    </div>
                                    <div className="label-input">
                                        <label htmlFor="location">Location</label>
                                        <input name="location" placeholder="Indianapolis, IN" type="text" onChange={(e) => {
                                            this.setState({customer: {...customer, location: e.target.value }})
                                        }}/>
                                    </div>

                                </div>
                        </div>
                    </div>

                    <button className="contact-us-button" type="submit">Contact Us</button>

                </form>
            </div>
        )
    }

}

export default withRouter(Results)

// Results.propTypes = {
//     insurance_needs: PropTypes.number.isRequired,
//     timeline: PropTypes.string.isRequired
// }