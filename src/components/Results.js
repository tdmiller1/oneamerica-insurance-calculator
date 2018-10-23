import React, {Component} from 'react'
import { withRouter } from "react-router";
import PropTypes from "prop-types";


class Results extends Component {

    render() {
        return (
            <div className="component center">
                <div className="overview text">
                    <h1>Lorem Ipsum Dolor Sit Amet, Consectetur Elit?</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
                </div>

                <div className="results-information">
                    <h1>Generic Information You May Need</h1>

                    <div className="center">
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

                <div>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        this.submitInformation()
                    }}/>


                    <h1>Want to know more? Contact us here:</h1>
                    <div className="customer-submit mobile">

                       <div>
                           <label htmlFor="full-name">Full Name</label>
                           <br/>
                           <input name="full-name" type="text" />
                        </div>
                        <div>
                            <label htmlFor="email">Email</label>
                            <br/>
                            <input name="email" type="email" />
                        </div>
                        <div>
                            <label htmlFor="phone">Phone</label>
                            <br/>
                            <input name="phone" type="tel" />
                        </div>

                    </div>

                    <div className="customer-submit desktop">

                        <label htmlFor="full-name">Full Name</label>
                        <input name="full-name" type="text"/>

                        <label htmlFor="email">Email</label>
                        <input name="email" type="email"/>

                        <label htmlFor="phone">Phone</label>
                        <input name="phone" type="tel"/>

                    </div>

                    <button className="button" type="submit">Contact Us</button>

                </div>

            </div>
        )
    }

}

export default withRouter(Results)

// Results.propTypes = {
//     insurance_needs: PropTypes.number.isRequired,
//     timeline: PropTypes.string.isRequired
// }