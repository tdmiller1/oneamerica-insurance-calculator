import React, {Component} from 'react'
class ClientCard extends Component {

    render() {
        return(
            <div>
                <h2>{this.props.name}</h2>
                <p>{this.props.phone}</p>
            </div>
        )
    }
}

export default ClientCard;