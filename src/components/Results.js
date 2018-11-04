import React, {Component} from 'react'
import { withRouter } from "react-router";
import PropTypes from "prop-types";


class Results extends Component {

    constructor(props){
        super(props)
        this.state = {

            full_name: 1,
            email: 1,
            phone: 1,

        }
    }

    render() {
        return (
            <form className="component" onSubmit={(e) => {
                e.preventDefault();
                // this.submitInformation()
                console.log(this.state);
            }}>

                <h3 id="calculator-title">LIFE INSURANCE CALCULATOR</h3>

                <div className="overview-text">
                    <h1>Lorem Ipsum Dolor Sit Amet, Consectetur Elit?</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
                </div>

                <div className="results-information overview-text">
                    <h1>Generic Information You May Need</h1>

                    <div>
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

                <div className="overview-text">

                    <h1>Want to know more? Contact us here:</h1>
                    <div className="customer-submit mobile">

                       <div>
                           <label htmlFor="full-name">Full Name</label>
                           <br/>
                           <input name="full_name" type="text"  onChange={(e) => {
                               this.setState({
                                   full_name: e.target.value
                               })
                           }}/>
                        </div>
                        <div>
                            <label htmlFor="email">Email</label>
                            <br/>
                            <input name="email" type="email"  onChange={(e) => {
                                this.setState({
                                    email: e.target.value
                                })
                            }}/>
                        </div>
                        <div>
                            <label htmlFor="phone">Phone</label>
                            <br/>
                            <input name="phone" type="tel"  onChange={(e) => {
                                this.setState({
                                    phone: e.target.value
                                })
                            }}/>
                        </div>

                        <div>
                            <label htmlFor="location">Location</label>
                            <br/>
                            <input name="location" type="tel" onChange={(e) => {
                                this.setState({
                                    location: e.target.value
                                })
                            }}/>
                        </div>

                    </div>

                    <div className="customer-submit desktop">

                        <label htmlFor="full-name">Full Name</label>
                        <input name="full-name" type="text" onChange={(e) => {
                            this.setState({
                                full_name: e.target.value
                            })
                        }}/>

                        <label htmlFor="email">Email</label>
                        <input name="email" type="email" onChange={(e) => {
                            this.setState({
                                email: e.target.value
                            })
                        }}/>

                        <label htmlFor="phone">Phone</label>
                        <input name="phone" type="tel" onChange={(e) => {
                            this.setState({
                                phone: e.target.value
                            })
                        }}/>

                        <label htmlFor="location">Location</label>
                        <input name="location" type="tel" onChange={(e) => {
                            this.setState({
                                location: e.target.value
                            })
                        }}/>

                    </div>

                    <button className="button" type="submit">Contact Us</button>


                </div>


            </form>
        )
    }

}

export default withRouter(Results)

// Results.propTypes = {
//     insurance_needs: PropTypes.number.isRequired,
//     timeline: PropTypes.string.isRequired
// }