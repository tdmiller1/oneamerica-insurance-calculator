import React, {Component} from 'react'
import { withRouter, Switch, Route } from "react-router";


class Results extends Component {

    render() {
        return (
            <div>
                <h1>This is the Results page</h1>
            </div>
        )
    }

}

export default withRouter(Results)