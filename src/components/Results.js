import React, {Component} from 'react'
import { withRouter } from "react-router";
import PropTypes from "prop-types";


class Results extends Component {

    render() {
        return (
            <div>

                <div className="overview">
                    <h1>Lorem Ipsum Dolor Sit Amet, Consectetur Elit?</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
                </div>

                <div className="results-information">
                    <h1>Generic Information You May Need</h1>
                    <ol>
                        <li>You might want to know the number $10,000</li>
                        <li>You might also want to know the number of $12,000 for your spouse.</li>
                        <br/>
                        <li>You might want to know the number $10,000</li>
                        <li>You might also want to know the number of $12,000 for your spouse.</li>
                        <br/>
                        <li>You might want to know the number $10,000</li>
                        <li>You might also want to know the number of $12,000 for your spouse.</li>
                    </ol>
                </div>

                <div>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        this.submitInformation()
                    }}/>

                    <div className="customer-submit">

                        <label for="full-name">Full Name</label>
                        <input name="full-name" type="text" />

                        <label for="email">Email</label>
                        <input name="email" type="email" />

                        <label for="phone">Phone</label>
                        <input name="phone" type="tel" />

                    </div>

                    <button type="submit">Contact</button>

                </div>
            </div>
        )
    }

}

export default withRouter(Results)

Results.propTypes = {
    insurance_needs: PropTypes.number.isRequired,
    timeline: PropTypes.string.isRequired
}