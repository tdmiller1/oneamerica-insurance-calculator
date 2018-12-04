import React, {Component} from 'react'
import { withRouter } from "react-router";

class Success extends Component {

    render(){

        return (
            <section>
                <h1>Success!</h1>
                <p>You've submitted your information to our database, and a OneAmerica representative will be in contact
                with you shortly. Thank you for visiting.</p>
            </section>
        )

    }

}

export default withRouter(Success)