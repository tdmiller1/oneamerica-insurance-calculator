import React, {Component} from 'react'
import { withRouter } from "react-router";

class Failure extends Component {

    render(){

        return (
            <section>
                <h1>Oops!</h1>
                <p>Something went wrong on our end sorry for the inconvenience.</p>
            </section>
        )

    }

}

export default withRouter(Failure)